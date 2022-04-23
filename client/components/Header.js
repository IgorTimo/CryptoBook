import { Button, Menu } from "semantic-ui-react";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [currentAccount, setCurrentAccount] = useState();

  const handleLogInClick = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      alert("У вас нет метамаска!");
    }

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Menu style={{ marginTop: "20px" }}>
      <Link href="/">
        <Menu.Item>Главная</Menu.Item>
      </Link>
      <Link href="/add">
        <Menu.Item>Записать контакт</Menu.Item>
      </Link>
      <Link href="/show">
        <Menu.Item>Посмотреть контакт</Menu.Item>
      </Link>
      <Menu.Item position="right">
        {!currentAccount ? (
          <Button primary onClick={handleLogInClick}>
            Вход
          </Button>
        ) : (
          <Link href="/user">
            <Button primary onClick={handleLogInClick}>
              {currentAccount}
            </Button>
          </Link>
        )}
      </Menu.Item>
    </Menu>
  );
};

export default Header;
