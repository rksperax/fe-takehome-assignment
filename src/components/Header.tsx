import { useConnect } from "@particle-network/authkit";

const Header = () => {
  const mainHeading = {
    text: "Welcome to",
    linkHref: "https://www.decen-masters.com/",
    linkImageSrc: "/logo.svg",
    linkImageAlt: "Decen Masters Logo",
    linkImageWidth: 240,
    linkImageHeight: 24,
  };

  const subHeading = "Connect with social logins and send a transaction.";
  const { connected } = useConnect();
  return (
    <>
      <h1 className="text-4xl mt-4 font-bold mb-12 text-center flex items-center justify-center">
        {mainHeading.text}
        <a
          href={mainHeading.linkHref}
          className="text-blue-400 hover:text-blue-300 transition duration-300 ml-4"
          target="_blank"
          rel="noopener noreferrer">
          <img
            src={mainHeading.linkImageSrc}
            alt={mainHeading.linkImageAlt}
            width={mainHeading.linkImageWidth}
            height={mainHeading.linkImageHeight}
          />
        </a>
      </h1>
      {!connected ? (
        <h2 className="text-xl font-bold mb-6">{subHeading}</h2>
      ) : null}
    </>
  );
};

export default Header;
