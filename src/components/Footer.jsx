import GitHubButton from 'react-github-btn';

function Footer() {
  return (
    <footer className="safari_only py-3 text-white text-center">
      <p>
        Support us or Contribute on{" "}
        <a
          href="https://github.com/miljkovicjovan/minimalist-task-tracker"
          target="_blank"
          rel="noreferrer"
          className="text-primary text-decoration-none mx-2"
        >
          GitHub &#10084;&#65039;
        </a>
      </p>
      <GitHubButton
        href="https://github.com/miljkovicjovan/minimalist-task-tracker"
        data-icon="octicon-star"
        data-size="large"
        data-show-count="true"
        aria-label="Star miljkovicjovan/minimalist-task-tracker on GitHub"
        className="p-0 m-0"
      >
        Give us a Star
      </GitHubButton>
    </footer>
  );
}

export default Footer;
