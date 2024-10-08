import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { keyframes, SvgIcon } from "@mui/material"
import { forwardRef } from "react"

type FontAwesomeSvgIconProps = {
  className?: string
  icon: IconDefinition
  spin?: boolean
  fixedWidth?: boolean
}

const spinKeyframes = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

export const FontAwesomeIcon = forwardRef<
  SVGSVGElement,
  FontAwesomeSvgIconProps
>(function FontAwesomeIcon(props, ref) {
  const { className, icon, spin = false } = props

  const {
    icon: [width, height, _ligatures, _unicode, svgPathData],
  } = icon

  return (
    <SvgIcon
      ref={ref}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      sx={[spin && { animation: `${spinKeyframes} 1s infinite linear` }]}
    >
      {typeof svgPathData === "string" ? (
        <path d={svgPathData} />
      ) : (
        /**
         * A multi-path Font Awesome icon seems to imply a duotune icon. The 0th path seems to
         * be the faded element (referred to as the "secondary" path in the Font Awesome docs)
         * of a duotone icon. 40% is the default opacity.
         *
         * @see https://fontawesome.com/how-to-use/on-the-web/styling/duotone-icons#changing-opacity
         */
        svgPathData.map((d: string, i: number) => (
          <path key={i} style={{ opacity: i === 0 ? 0.4 : 1 }} d={d} />
        ))
      )}
    </SvgIcon>
  )
})
