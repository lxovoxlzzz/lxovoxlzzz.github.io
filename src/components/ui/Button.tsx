interface buttonType {
  label: string
  onClick: () => void
  width?: string
  height?: string
  bgColor?: string
  textColor?: string
  borderColor?: string
  animation?: boolean
  disabled?: boolean
}

export default function Button({
  label,
  onClick,
  width,
  height,
  bgColor,
  textColor,
  borderColor,
  animation = true,
  disabled = false,
}: buttonType) {
  const widthStyles = width ? width : 'w-auto'
  const heightStyles = height ? height : 'h-auto'
  const bgColorStyles = disabled
    ? 'bg-gray-500'
    : `${bgColor ? `${bgColor}` : 'bg-transparent'} cursor-pointer`
  const textColorStyles = textColor ? `${textColor}` : 'text-black'
  const borderStyles = borderColor ? `border-2 ${borderColor}` : 'border-none'
  const animationStyles =
    disabled || !animation
      ? ''
      : 'transition-all duration-300 ease-in-out hover:-translate-y-[2px] hover:shadow-md'

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`px-4 pt-2 pb-1 rounded ${widthStyles} ${heightStyles} ${bgColorStyles} ${textColorStyles} ${borderStyles} ${animationStyles}`}
    >
      {label}
    </button>
  )
}
