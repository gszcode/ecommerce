import { Helmet } from 'react-helmet'

function Meta({ title }) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
    </>
  )
}

export default Meta
