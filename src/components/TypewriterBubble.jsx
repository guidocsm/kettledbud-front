import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors } from "../constants/theme";

/**
 * TypewriterBubble
 *
 * Burbuja de diálogo con efecto máquina de escribir (character-by-character).
 * Diseñada para KettleBud — la mascota Kettlebi "habla" a través de esta burbuja.
 *
 * ── Soporte multi-children ──────────────────────────────────────────────
 * Acepta uno o varios children. Cuando recibe múltiples elementos, los
 * dispone en columna (flexDirection: column) con un gap configurable.
 * El efecto typewriter fluye secuencialmente de un child al siguiente:
 * primero se completa el texto del child 1, luego aparece el child 2, etc.
 *
 * ── Técnica de la flecha sin línea visible ──────────────────────────────
 * Se usan DOS cuadrados rotados 45°:
 *   1. arrowBorder  → color del borde (#0A7A70), zIndex bajo
 *   2. arrowFill    → color del fondo (#FFFFFF), ligeramente más pequeño y
 *                     desplazado hacia dentro de la burbuja
 * El arrowFill tapa la línea del borde en la unión → continuidad perfecta.
 *
 * ── Props ────────────────────────────────────────────────────────────────
 * @param {ReactNode}        children       — Uno o varios elementos de texto.
 * @param {boolean}          animated       — true = typewriter. Default: true.
 * @param {number}           width          — Ancho de la burbuja en px. Default: 240.
 * @param {"left"|"right"|"top"|"bottom"} arrowDirection — Hacia donde apunta
 *                                           el triángulo (donde está la mascota). Default: "left".
 * @param {number}           speed          — ms por carácter (constante). Default: 40.
 * @param {number}           childrenGap    — Gap en px entre children. Default: 15.
 * @param {function}         onComplete     — Callback al terminar toda la animación.
 * @param {object}           textStyle      — Estilos extra para el <Text> fallback.
 * @param {object}           containerStyle — Estilos extra para el wrapper.
 * @param {function}         onPress        — Callback adicional al pulsar (además del skip).
 */

// ─── Constantes de diseño ──────────────────────────────────────────────
// const COLORS = {
//   border: "#0A7A70",
//   background: "#FFFFFF",
//   text: "#2D3436",
//   shadow: "#000000",
// };

const ARROW_SIZE = 14;
const ARROW_FILL_SIZE = 12;
const BORDER_WIDTH = 2;
const BORDER_RADIUS = 20;

const DEFAULTS = {
  animated: true,
  width: 240,
  direction: "left",
  speed: 40,
  childrenGap: 15,
};

// ─── Utilidad: extraer texto plano de un nodo (recursivo) ──────────────
function extractText(node) {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node.props?.children != null) return extractText(node.props.children);
  return "";
}

// ─── Utilidad: clonar un elemento React reemplazando su texto ──────────
// Recorre recursivamente el árbol JSX hasta encontrar el nodo de texto
// más profundo y lo reemplaza con `newText`.
function cloneWithText(element, newText) {
  if (typeof element === "string" || typeof element === "number") {
    return newText;
  }
  if (!React.isValidElement(element)) return newText;

  const { children: originalChildren, ...restProps } = element.props;

  // Si el children directo es texto plano → reemplazar
  if (
    typeof originalChildren === "string" ||
    typeof originalChildren === "number"
  ) {
    return React.cloneElement(element, restProps, newText);
  }

  // Si es un solo elemento hijo → recurrir
  if (React.isValidElement(originalChildren)) {
    return React.cloneElement(
      element,
      restProps,
      cloneWithText(originalChildren, newText)
    );
  }

  // Si es un array de children → distribuir texto proporcionalmente
  if (Array.isArray(originalChildren)) {
    let consumed = 0;
    const mapped = originalChildren.map((child) => {
      const childFullText = extractText(child);
      const remaining = newText.length - consumed;
      if (remaining <= 0) return cloneWithText(child, "");
      const slice = newText.slice(consumed, consumed + childFullText.length);
      consumed += childFullText.length;
      return cloneWithText(child, slice);
    });
    return React.cloneElement(element, restProps, ...mapped);
  }

  // Fallback
  return React.cloneElement(element, restProps, newText);
}

// ─── Componente ────────────────────────────────────────────────────────
export function TypewriterBubble({
  children,
  animated = DEFAULTS.animated,
  width = DEFAULTS.width,
  arrowDirection = DEFAULTS.direction,
  speed = DEFAULTS.speed,
  childrenGap = DEFAULTS.childrenGap,
  onComplete,
  textStyle,
  containerStyle,
  onPress,
}) {
  // ─── Normalizar children a array ─────────────────────────────────────
  const childArray = useMemo(
    () => React.Children.toArray(children),
    [children]
  );

  // ─── Precalcular mapa de rangos acumulados ───────────────────────────
  // Cada child → { element, text, start, end }
  // start/end = índices en el "string total virtual" concatenado
  const childMap = useMemo(() => {
    let offset = 0;
    return childArray.map((element) => {
      const text = extractText(element);
      const entry = { element, text, start: offset, end: offset + text.length };
      offset += text.length;
      return entry;
    });
  }, [childArray]);

  const totalLength = useMemo(
    () => childMap.reduce((sum, c) => sum + c.text.length, 0),
    [childMap]
  );

  // ─── Estado de la animación ──────────────────────────────────────────
  const [displayedCount, setDisplayedCount] = useState(
    animated ? 0 : totalLength
  );
  const intervalRef = useRef(null);
  const completedRef = useRef(false);

  // ─── Helpers ─────────────────────────────────────────────────────────
  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const fireComplete = useCallback(() => {
    if (!completedRef.current) {
      completedRef.current = true;
      if (onComplete) setTimeout(onComplete, 0);
    }
  }, [onComplete]);

  // ─── Arrancar / resetear animación ───────────────────────────────────
  useEffect(() => {
    clearTimer();
    completedRef.current = false;

    if (!animated) {
      setDisplayedCount(totalLength);
      if (onComplete) setTimeout(onComplete, 0);
      return;
    }

    setDisplayedCount(0);

    intervalRef.current = setInterval(() => {
      setDisplayedCount((prev) => {
        const next = prev + 1;
        if (next >= totalLength) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          fireComplete();
          return totalLength;
        }
        return next;
      });
    }, speed);

    return clearTimer;
  }, [totalLength, animated, speed]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Skip al pulsar ─────────────────────────────────────────────────
  const handlePress = useCallback(() => {
    clearTimer();
    setDisplayedCount(totalLength);
    fireComplete();
    onPress?.();
  }, [totalLength, clearTimer, fireComplete, onPress]);

  // ─── Render de los children con texto recortado ─────────────────────
  const renderContent = () => {
    return childMap.map((entry, index) => {
      const { element, text, start } = entry;

      // Este child aún no empezó → no renderizar
      if (displayedCount <= start) return null;

      const charsVisible = Math.min(displayedCount - start, text.length);
      const visibleText = text.slice(0, charsVisible);

      // Gap entre children (excepto el primero)
      const gapStyle = index > 0 ? { marginTop: childrenGap } : undefined;

      // String plano → usar <Text> fallback
      if (typeof element === "string" || typeof element === "number") {
        return (
          <View key={index} style={gapStyle}>
            <Text style={[styles.text, textStyle]}>{visibleText}</Text>
          </View>
        );
      }

      // Elemento React (ej. <CustomText>) → clonar con texto recortado
      if (React.isValidElement(element)) {
        return (
          <View key={element.key || index} style={gapStyle}>
            {cloneWithText(element, visibleText)}
          </View>
        );
      }

      return null;
    });
  };

  // ─── Arrow positions ────────────────────────────────────────────────
  const arrowPositions = getArrowPositions(arrowDirection);

  // ─── Render ──────────────────────────────────────────────────────────
  return (
    <View style={[styles.wrapper, containerStyle]}>
      <Pressable
        onPress={handlePress}
        style={[styles.bubbleContainer, { width }]}
      >
        {/* Capa 1: cuadrado con borde (debajo de la burbuja) */}
        <View style={[styles.arrowBorder, arrowPositions.border]} />

        {/* Burbuja principal */}
        <View style={styles.bubble}>{renderContent()}</View>

        {/* Capa 2: cuadrado relleno (encima, tapa la línea del borde) */}
        <View style={[styles.arrowFill, arrowPositions.fill]} />
      </Pressable>
    </View>
  );
}

// ─── Posicionamiento de las flechas ────────────────────────────────────
function getArrowPositions(direction) {
  const borderOutset = Math.round((ARROW_SIZE * Math.SQRT2) / 2) - 1;

  switch (direction) {
    case "left":
      return {
        border: {
          left: -(borderOutset - BORDER_WIDTH),
          top: "50%",
          marginTop: -(ARROW_SIZE / 2),
          borderBottomColor: colors.main,
          borderLeftColor: colors.main,
          borderTopColor: "transparent",
          borderRightColor: "transparent",
        },
        fill: {
          left: -(borderOutset - BORDER_WIDTH) + 3,
          top: "50%",
          marginTop: -(ARROW_FILL_SIZE / 2),
          width: ARROW_FILL_SIZE,
          height: ARROW_FILL_SIZE,
        },
      };

    case "right":
      return {
        border: {
          right: -(borderOutset - BORDER_WIDTH),
          top: "50%",
          marginTop: -(ARROW_SIZE / 2),
          borderTopColor: colors.main,
          borderRightColor: colors.main,
          borderBottomColor: "transparent",
          borderLeftColor: "transparent",
        },
        fill: {
          right: -(borderOutset - BORDER_WIDTH) + 3,
          top: "50%",
          marginTop: -(ARROW_FILL_SIZE / 2),
          width: ARROW_FILL_SIZE,
          height: ARROW_FILL_SIZE,
        },
      };

    case "top":
      return {
        border: {
          top: -(borderOutset - BORDER_WIDTH),
          left: "50%",
          marginLeft: -(ARROW_SIZE / 2),
          borderTopColor: colors.main,
          borderLeftColor: colors.main,
          borderBottomColor: "transparent",
          borderRightColor: "transparent",
        },
        fill: {
          top: -(borderOutset - BORDER_WIDTH) + 3,
          left: "50%",
          marginLeft: -(ARROW_FILL_SIZE / 2),
          width: ARROW_FILL_SIZE,
          height: ARROW_FILL_SIZE,
        },
      };

    case "bottom":
      return {
        border: {
          bottom: -(borderOutset - BORDER_WIDTH),
          left: "50%",
          marginLeft: -(ARROW_SIZE / 2),
          borderBottomColor: colors.main,
          borderRightColor: colors.main,
          borderTopColor: "transparent",
          borderLeftColor: "transparent",
        },
        fill: {
          bottom: -(borderOutset - BORDER_WIDTH) + 3,
          left: "50%",
          marginLeft: -(ARROW_FILL_SIZE / 2),
          width: ARROW_FILL_SIZE,
          height: ARROW_FILL_SIZE,
        },
      };

    default:
      return getArrowPositions("left");
  }
}

// ─── Estilos ───────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  wrapper: {},

  bubbleContainer: {
    position: "relative",
  },

  bubble: {
    backgroundColor: colors.white,
    borderWidth: BORDER_WIDTH,
    borderColor: colors.main,
    borderRadius: BORDER_RADIUS,
    paddingHorizontal: 16,
    paddingVertical: 12,
    zIndex: 1,

    // Box shadow — iOS
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    // Box shadow — Android
    elevation: 4,
  },

  arrowBorder: {
    position: "absolute",
    width: ARROW_SIZE,
    height: ARROW_SIZE,
    // borderWidth: BORDER_WIDTH,
    // borderColor: colors.main,
    transform: [{ rotate: "45deg" }],
    zIndex: 0,
  },

  arrowFill: {
    position: "absolute",
    width: ARROW_FILL_SIZE,
    height: ARROW_FILL_SIZE,
    backgroundColor: colors.white,
    transform: [{ rotate: "45deg" }],
    zIndex: 2,
  },
});