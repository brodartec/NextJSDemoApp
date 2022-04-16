import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./AppHeader.module.css";
import classNames from "classNames";

type LinkInfo = {
  label: string;
  path: string;
};

type AppHeaderProps = {
  links: LinkInfo[];
};

const AppHeader = ({ links }: AppHeaderProps) => {
  const router = useRouter();
  return (
    <header className={styles.appHeader}>
      <h1 className={styles.appHeaderTitle}>GFM Demo App</h1>
      <div>
        {links.map((link) => (
          <Link key={link.path} href={link.path}>
            <a
              className={classNames(styles.appHeaderLink, {
                [styles.appHeaderLinkActive]: router.pathname === link.path,
              })}
            >
              {link.label}
            </a>
          </Link>
        ))}
      </div>
    </header>
  );
};

export default AppHeader;
