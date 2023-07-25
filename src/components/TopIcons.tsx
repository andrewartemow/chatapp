import { FC } from 'react';
import './TopIcons.css';

import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

export const TopIcons: FC = () => {
  return (
    <div className="top-icons">
      <div className="top-icons-group">
        <a
          href="https://github.com/andrewartemow"
          target="_blank"
          rel="noopener noreferrer"
          className="github"
        >
          <AiFillGithub />
          <p>GitHub</p>
        </a>
        <a
          href="https://www.linkedin.com/in/andreiartemow/"
          className="linkedIn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillLinkedin />
          <p>LinkedIn</p>
        </a>
      </div>
    </div>
  );
};
