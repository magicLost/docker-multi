import React from "react";
import Link from "next/link";

const OtherPage = () => {
  return (
    <div>
      <p>I'm some other page.</p>
      <Link href="/">Go back home</Link>
    </div>
  );
};

export default OtherPage;
