import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy for Using Google Calendar</h1>

      <p className="mb-4">
        At Ecole Supérieure d Agricultures in Angers, we respect your privacy
        and are committed to protecting your personal information. This Privacy
        Policy outlines how we collect, use, and safeguard the information you
        provide when using our services to interact with Google Calendar.
      </p>

      <h2 className="text-xl font-bold mb-2">1. Information We Collect:</h2>
      <p className="mb-4">
        - When you authorize our application to access your Google Calendar, we
        may collect certain information from your calendar account, including
        event details such as event titles, dates, times, locations,
        descriptions, and any other information associated with your calendar
        events.
      </p>

      <h2 className="text-xl font-bold mb-2">2. How We Use Your Information:</h2>
      <p className="mb-4">
        We use the information collected from your Google Calendar solely for
        the purpose of providing you with the services you have requested, such
        as adding, updating, and deleting events on your calendar. We do not
        use your calendar information for any other purpose without your
        explicit consent.
      </p>

      <h2 className="text-xl font-bold mb-2">3. Data Security:</h2>
      <p className="mb-4">
        - We take appropriate measures to protect your personal information
        from unauthorized access, alteration, disclosure, or destruction. We
        use industry-standard encryption technologies to secure data
        transmission and storage.
      </p>

      <h2 className="text-xl font-bold mb-2">4. Data Retention:</h2>
      <p className="mb-4">
        We retain your calendar information only for as long as necessary to
        fulfill the purposes for which it was collected or as required by law.
      </p>

      <h2 className="text-xl font-bold mb-2">5. Third-Party Access:</h2>
      <p className="mb-4">
        - We may share your calendar information with third-party service
        providers who assist us in providing our services. These third parties
        are contractually obligated to maintain the confidentiality and security
        of your information.
      </p>

      <h2 className="text-xl font-bold mb-2">6. Your Rights:</h2>
      <p className="mb-4">
        You have the right to access, update, and delete your calendar
        information at any time. - You can revoke our access to your Google
        Calendar by revoking the permissions granted to our application.
      </p>

      <h2 className="text-xl font-bold mb-2">7. Changes to this Policy:</h2>
      <p className="mb-4">
        We reserve the right to update or change this Privacy Policy at any
        time. Any changes will be effective immediately upon posting the revised
        Privacy Policy on our website.
      </p>

      <p className="mb-4">
        By using our services to interact with Google Calendar, you consent to
        the collection and use of your information as described in this Privacy
        Policy. If you have any questions or concerns about this Privacy Policy,
        please contact us at:
      </p>
      <p className="mb-4">
        ESA Campus
        289, rue Clemenceau
        Beirut, Lebanon- B.P. 113 - 7318
        <br />
        +961 1 373 373
        <br />
        +961 1 373 374
        <br />
        esa@esa.edu.lb
      </p>
      <p className="mb-4">Last updated: 5/3/2024</p>
      <p>Ecole Supérieure dAgricultures in Angers</p>

      {/* Added disclosure */}
      <p className="mb-4">
        (App’s) use and transfer to any other app of information received from Google APIs will adhere to Google API Services User Data Policy, including the Limited Use requirements. For more details, please read the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
