const Button = ({ className, type, onClick, ...restProps }) => {
  return <button {...restProps} className={`btn ${className}`} type={type} onClick={onClick}/>;
};

export default Button;
