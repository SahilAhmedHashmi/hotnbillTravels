import { Link } from 'react-router-dom';
import Logo from '../common/Logo.jsx';
import Icon from '../common/Icon.jsx';
import { footerLinks } from '../../data/footer.js';
import { contact } from '../../data/contact.js';

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <Logo asLink={false} />
          {/* TODO: Replace this launch copy with verified business registration details before production. */}
          <p>
            Crafting authentic, responsible journeys through Northeast India since 2010. Registered business details to
            be verified before launch.
          </p>
          <div className="footer-contact">
            <a href={contact.phoneHref}>{contact.phoneLabel}</a>
            <a href={contact.emailHref}>{contact.emailLabel}</a>
            <span>{contact.address}</span>
          </div>
          <div className="footer-social" aria-label="Social links">
            <a className="soc-btn" href={contact.whatsappHref} aria-label="WhatsApp">
              <Icon name="whatsapp" />
            </a>
            <a className="soc-btn" href={contact.emailHref} aria-label="Email">
              <Icon name="mail" />
            </a>
          </div>
        </div>
        {footerLinks.map((group) => (
          <div className="footer-col" key={group.title}>
            <h4>{group.title}</h4>
            <ul>
              {group.links.map(([label, to]) => (
                <li key={`${group.title}-${label}`}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <p>Copyright (c) 2026 Hornbill Journeys Pvt. Ltd. Guwahati, Assam. All rights reserved.</p>
        <div className="footer-states">
          <span>Assam</span>
          <span>Meghalaya</span>
          <span>Arunachal</span>
          <span>Mizoram</span>
          <span>Tripura</span>
          <span>Sikkim</span>
        </div>
      </div>
    </footer>
  );
}
