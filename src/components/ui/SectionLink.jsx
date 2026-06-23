import { Link } from 'react-router-dom';
import { sectionPath } from '../../data/navigation';

const SectionLink = ({ sectionId, className = '', children, ...props }) => (
  <Link to={sectionPath(sectionId)} className={className} {...props}>
    {children}
  </Link>
);

export default SectionLink;
