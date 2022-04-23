import { useState } from "react";
import { Form, Input, Button, Message } from "semantic-ui-react";
import Layout from "../components/Layout";
import provider from "../provider";
import contactFactory from "../contactFactory";

const AddContact = () => {
  const [telegram, setTelegram] = useState("");
  const [discord, setDiscord] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSeccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSeccessMessage("");
    if(!telegram){
        setErrorMessage("Ну хоть телеграмм то заполни...")
    }
    const signer = provider.getSigner();
    const contactFactoryWithSigner = contactFactory.connect(signer);
    console.log("func: ", contactFactoryWithSigner.functions);
    try {
      let response;
      if (discord) {
        response = await contactFactoryWithSigner[
          "createContact(string,string)"
        ](telegram, discord);
      } else {
        response = await contactFactoryWithSigner["createContact(string)"](
          telegram
        );
      }
      console.log("respose: ", response);
      setSeccessMessage("Хэш транзакции такой " + response.hash);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <Layout>
      <Form
        error={!!errorMessage}
        success={!!successMessage}
        onSubmit={handleSubmit}
      >
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="Telegramm"
            value={telegram}
            onChange={(event) => setTelegram(event.target.value)}
            placeholder="Введите здесь"
          />
          <Form.Field
            control={Input}
            label="Discord"
            value={discord}
            onChange={(event) => setDiscord(event.target.value)}
            placeholder="Введите здесь"
          />
        </Form.Group>
        <Button primary>Сохранить</Button>
        <Message
          style={{ wordBreak: "break-word" }}
          error
          header="Ну что ж такое!"
          content={errorMessage}
        />
        <Message success header="Успех!" content={successMessage} />
      </Form>
    </Layout>
  );
};

export default AddContact;
