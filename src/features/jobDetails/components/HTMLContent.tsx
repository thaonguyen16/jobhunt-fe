import styles from "./HTMLContent.module.css";

type HtmlContenProps = {
  htmlContent?: string;
};

export default function HtmlContent({ htmlContent }: HtmlContenProps) {
  return (
    <div
      className={styles["html-content"]}
      dangerouslySetInnerHTML={{ __html: htmlContent || "" }}
    />
  );
}
