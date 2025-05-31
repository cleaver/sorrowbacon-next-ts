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
            {/* Mailchimp generated form */}
            <div id="mc_embed_shell">
              <link href="//cdn-images.mailchimp.com/embedcode/classic-061523.css" rel="stylesheet" type="text/css" />
              <style type="text/css">{`
                #mc_embed_signup {
                  background: #fff;
                  clear: left;
                  font: 14px Helvetica, Arial, sans-serif;
                  width: 600px;
                }
              `}</style>
              <div id="mc_embed_signup">
                <form 
                  action="https://sorrowbacon.us4.list-manage.com/subscribe/post?u=fe0fdf800bfbb99926336ef93&amp;id=443fe4954b&amp;f_id=00239cebf0" 
                  method="post" 
                  id="mc-embedded-subscribe-form" 
                  name="mc-embedded-subscribe-form" 
                  className="validate" 
                  target="_self" 
                  noValidate
                >
                  <div id="mc_embed_signup_scroll">
                    <div className="indicates-required">
                      <span className="asterisk">*</span> indicates required
                    </div>
                    <div className="mc-field-group">
                      <label htmlFor="mce-EMAIL">Email Address <span className="asterisk">*</span></label>
                      <input type="email" name="EMAIL" className="required email" id="mce-EMAIL" required defaultValue="" />
                    </div>
                    <div className="mc-field-group">
                      <label htmlFor="mce-FNAME">First Name </label>
                      <input type="text" name="FNAME" className="text" id="mce-FNAME" defaultValue="" />
                    </div>
                    <div id="mce-responses" className="clear foot">
                      <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
                      <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
                    </div>
                    <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                      {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
                      <input type="text" name="b_fe0fdf800bfbb99926336ef93_443fe4954b" tabIndex={-1} defaultValue="" />
                    </div>
                    <div className="optionalParent">
                      <div className="clear foot">
                        <input type="submit" name="subscribe" id="mc-embedded-subscribe" className="button" value="Subscribe" />
                        {/* <p style={{ margin: '0px auto' }}>
                          <a href="http://eepurl.com/jfTPY6" title="Mailchimp - email marketing made easy and fun">
                            <span style={{ 
                              display: 'inline-block', 
                              backgroundColor: 'transparent', 
                              borderRadius: '4px' 
                            }}>
                              <img 
                                className="refferal_badge" 
                                src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-dark.svg" 
                                alt="Intuit Mailchimp" 
                                style={{ 
                                  width: '220px', 
                                  height: '40px', 
                                  display: 'flex', 
                                  padding: '2px 0px', 
                                  justifyContent: 'center', 
                                  alignItems: 'center' 
                                }} 
                              />
                            </span>
                          </a>
                        </p> */}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* End Mailchimp generated form */}
          </div>
        </div>
        <div>We won&apos;t sell your email address ever!</div>
      </article>
    </>
  );
}

export default ContactPage;
