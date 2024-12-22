import React from 'react' 
import LogoTitle from "/Images/LogoTitle.png";
import { Helmet } from 'react-helmet';
export default function TitleAndIcon() {
  return (
    <div>
      <Helmet>
        <title>FreshCart</title>
        <link rel="icon" type="image/svg+xml" href={LogoTitle} />
      </Helmet>
    </div>
  );
}
