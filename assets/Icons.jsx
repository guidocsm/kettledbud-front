import { Svg, Path } from 'react-native-svg'

export function BackIcon({ width = 22, height = 22, stroke = '#1A1A1A' }) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 22 22" fill="none">
      <Path d="M3.66675 11L9.16675 16.5M3.66675 11L9.16675 5.5M3.66675 11H13.2917M18.3334 11H16.0417" stroke={stroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
  )
}