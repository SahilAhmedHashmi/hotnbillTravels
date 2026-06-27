import { Link } from 'react-router-dom';

export default function Button({ to, href, children, variant = 'gold', className = '', ...props }) {
  const classNames = `btn btn-${variant} ${className}`.trim();
  if (to) {
    return (
      <Link className={classNames} to={to} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a className={classNames} href={href} {...props}>
      {children}
    </a>
  );
}
