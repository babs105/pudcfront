import React from "react";

const classes = {
  footer: "w-full bg-gray-800 pb-8 text-center text-xs text-gray-400",
};
function Footer() {
  return (
    <footer className={classes.footer}>
      <p>Copyright &copy; 2020 BabaDi</p>
    </footer>
  );
}

export default Footer;
