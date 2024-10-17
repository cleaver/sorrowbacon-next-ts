import Head from "next/head";
import MailchimpForm from "../components/newsletter/mailchimp-form";
import { webHost } from "../lib/config";

function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact | sorrowbacon</title>
        <meta name="og:title" content="Newsletter | sorrowbacon" />
        <meta name="description" content="Sorrowbacon newsletter sign-up." />
        <meta
          name="og:description"
          content="Sign up for the sorrowbacon newsletter."
        />
        <meta name="og:url" content={webHost + "/newsletter"} />
      </Head>
      <article className="flex flex-col">
        <h1 className="mt-12">Get Updates!</h1>
        <div>
          Get updates about new comics and ideas in an occasional newsletter.
        </div>
        <div className="flex justify-center py-4">
          <div className="w-full md:w-4/5">
            <MailchimpForm />
          </div>
        </div>
        <div>We won&apos;t sell your email address ever!</div>
      </article>
    </>
  );
}

export default ContactPage;
