import { FormEvent, useState } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { mailchimpUrl } from "../../lib/config";

type FormFields = { EMAIL: string; FNAME: string };

function MailchimpForm() {
  const [formKey, setFormKey] = useState(1);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");

  return (
    <div className="flex flex-col">
      <MailchimpSubscribe<FormFields>
        key={formKey}
        url={mailchimpUrl}
        render={({ subscribe, status, message }) => {
          function onSubmit(e: FormEvent<HTMLFormElement>) {
            e.preventDefault();
            if (!email.trim()) return;
            subscribe({
              EMAIL: email,
              FNAME: firstName,
            });
          }

          const form = (
            <form onSubmit={onSubmit}>
              <div className="flex flex-col p-2">
                <label htmlFor="email">Email address</label>
                <input
                  className="text-lg px-4 py-2 border border-gray-400 rounded-md"
                  type="email"
                  name="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="merp@example.com"
                  required={true}
                />
              </div>
              <div className="flex flex-col p-2">
                <label htmlFor="fname">Name</label>
                <input
                  className="text-lg px-4 py-2 border border-gray-400 rounded-md"
                  type="text"
                  name="fname"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  placeholder="Friend Badger"
                />
              </div>
              <div className="mt-1 p-2">
                <button className="w-full bg-indigo-600 text-lg text-white px-4 py-2 rounded-md">
                  Subscribe
                </button>
              </div>
            </form>
          );

          switch (status) {
            case "sending":
              return (
                <div className="p-4 text-lg border-t border-b border-gray-400 text-blue-900">
                  sending...
                </div>
              );
              break;
            case "error":
              return (
                <div className="p-4 border-t border-b border-gray-400 ">
                  <div
                    className="text-lg text-red-800"
                    dangerouslySetInnerHTML={{
                      __html:
                        typeof message === "string"
                          ? message
                          : "An error occurred!",
                    }}
                  />
                  <button
                    className="bg-indigo-600 text-lg text-white my-4 px-4 py-2 rounded-md"
                    onClick={() => {
                      setFormKey(formKey + 1);
                    }}
                  >
                    Try again
                  </button>
                </div>
              );
            case "success":
              return (
                <div
                  className="text-lg p-4 border-t border-b border-gray-400 text-green-800"
                  dangerouslySetInnerHTML={{ __html: message }}
                />
              );
            default:
              return form;
          }
        }}
      />
    </div>
  );
}

export default MailchimpForm;
