import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircle, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faComment } from '@fortawesome/free-regular-svg-icons';
import {
  faGithub,
  faFacebookF,
  faFacebook,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

const installFontAwesome = () => {
  library.add(
    faCircle,
    faComment,
    faChevronUp,
    faEnvelope,
    faGithub,
    faFacebookF,
    faFacebook,
    faTwitter,
  );
};

export default installFontAwesome;
