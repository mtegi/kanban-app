import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useTranslation, getI18n } from 'react-i18next';

const SEO = ({ description, lang, meta, title }) => {
  const { t } = useTranslation('titles');
  const metaDescription = t(description);
  const metaTitle = t(title);

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={metaTitle}
      titleTemplate="%s"
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover',
        },
        {
          property: 'og:title',
          content: metaTitle,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
      ].concat(meta)}
    />
  );
};

SEO.defaultProps = {
  title: 'Home',
  lang: getI18n().language,
  meta: [],
  description: '',
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
};

export default SEO;
