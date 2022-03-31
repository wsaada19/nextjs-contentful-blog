import { Generic, JSONLD } from 'react-structured-data';

type ArticleLdProps = {
  description: string;
  title: string;
  datePublished: string;
};

export const ArticleLd = ({ description, title, datePublished }: ArticleLdProps) => {
  return (
    <JSONLD dangerouslyExposeHtml>
      <Generic
        type="Article"
        jsonldtype="Article"
        schema={{
          name: title,
          headline: title,
          description: description,
          datePublished: datePublished,
        }}
      ></Generic>
    </JSONLD>
  );
};
