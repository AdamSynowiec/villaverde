import React, { useState } from 'react';
import Container from '../Container';

const FloatingInput = ({ label, type, id, value, onChange }) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="peer h-[80px] w-full bg-transparent border-b-[5px] border-[#C8A35F] text-white text-[20px] pt-6 pb-2 placeholder-transparent focus:outline-none"
        placeholder={label}
      />
      <label
        className={`absolute left-0 text-[20px] text-white font-ebgaramond-regular transition-all duration-300
          ${value ? 'top-0 text-[#C8A35F] text-[16px]' : 'top-[24px]'}
          peer-focus:top-0 peer-focus:text-[#C8A35F] peer-focus:text-[16px]`}
      >
        {label}
      </label>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    privacyAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    let err = {};
    if (!formData.name) err.name = "Imię i nazwisko jest wymagane.";
    if (!formData.email) err.email = "Email jest wymagany.";
    if (!formData.phone) err.phone = "Telefon jest wymagany.";
    if (!formData.message) err.message = "Wiadomość jest wymagana.";
    if (!formData.privacyAccepted) err.privacyAccepted = "Musisz zaakceptować zgodę RODO.";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    const val = validate();
    if (Object.keys(val).length > 0) {
      setErrors(val);
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch("https://villaverde-wola.pl/server/mailer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setSuccess("Wiadomość została wysłana!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        privacyAccepted: false,
      });
    } catch (error) {
      setErrors({ form: "Wystąpił błąd. Spróbuj ponownie później." });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="bg-[#1C1D21] relative">
      <div id="Kontakt" />
      <Container>
        <div className="grid grid-cols-12">
          <div className="order-2 lg:order-1 col-span-12 lg:col-span-5 bg-[#FCFCFC] py-[50px] lg:py-[100px] px-4 lg:px-0">
            <div className="hidden lg:block absolute bg-[#FCFCFC] left-0 top-0 bottom-0 w-[40vw]"></div>
            <div className="relative z-20">
              <h3 className="text-[#C8A35F] font-ebgaramond-regular text-[64px] mb-[32px]">
                Kontakt
              </h3>
              <div className="grid gap-6">
                <ul className="font-ebgaramond-regular font-bold text-[21px] text-[#474747] max-w-2/3">
                  <li>Dane firmowe</li>
                </ul>
                <ul className="font-ebgaramond-regular font-medium text-[21px] text-[#474747] max-w-2/3">
                  <li>WOLA JUSTOWSKA INWESTYCJE 3 SP. Z O.O.</li>
                </ul>
                <ul className="font-ebgaramond-regular font-medium text-[21px] text-[#474747] max-w-2/3">
                  <li>ul. Koło Strzelnicy 2/2</li>
                  <li>30-219 Kraków</li>
                </ul>
                <ul className="font-ebgaramond-regular font-medium text-[21px] text-[#474747] max-w-2/3">
                  <li>KRS - 0001165947</li>
                  <li>NIP - 6772524077</li>
                  <li>REGON - 541393845</li>
                </ul>
                <ul className="font-ebgaramond-regular font-medium text-[21px] text-[#474747] max-w-2/3">
                  <li>Tel - +48 518 451 555</li>
                </ul>
              </div>
            </div>
          </div>

          {/* FORMULARZ */}
          <div className="relative order-1 lg:order-2 col-span-12 lg:col-span-7 py-[50px] lg:py-[100px] lg:pl-[100px]">
            <form className="flex flex-col gap-[32px]" onSubmit={handleSubmit}>
              <FloatingInput id="name" label="Imię i nazwisko" type="text" value={formData.name} onChange={handleChange} />
              {errors.name && <p className="text-red-500">{errors.name}</p>}

              <FloatingInput id="email" label="Adres e-mail" type="email" value={formData.email} onChange={handleChange} />
              {errors.email && <p className="text-red-500">{errors.email}</p>}

              <FloatingInput id="phone" label="Numer telefonu" type="tel" value={formData.phone} onChange={handleChange} />
              {errors.phone && <p className="text-red-500">{errors.phone}</p>}

              <div className="relative w-full">
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="peer h-[300px] w-full bg-transparent border-b-[5px] border-[#C8A35F] text-white text-[20px] pt-6 pb-2 placeholder-transparent focus:outline-none"
                  placeholder="Wiadomość"
                ></textarea>
                <label className={`absolute left-0 text-[20px] text-white font-ebgaramond-regular transition-all duration-300
          ${formData.message ? 'top-0 text-[#C8A35F] text-[16px]' : 'top-[24px]'}
          peer-focus:top-0 peer-focus:text-[#C8A35F] peer-focus:text-[16px]`}>
                  Wiadomość
                </label>
              </div>
              {errors.message && <p className="text-red-500">{errors.message}</p>}

              <label className="font-ebgaramond-regular text-white text-[20px] flex items-start gap-4">
                <input
                  id="privacyAccepted"
                  type="checkbox"
                  checked={formData.privacyAccepted}
                  onChange={handleChange}
                  className="mt-1"
                />
                Wyrażam zgodę na przetwarzanie moich danych osobowych…
              </label>
              {errors.privacyAccepted && <p className="text-red-500">{errors.privacyAccepted}</p>}

              {errors.form && <p className="text-red-500">{errors.form}</p>}
              {success && <p className="text-green-500">{success}</p>}

              <button
                className="bg-[#C8A35F] font-ebgaramond-regular text-white text-[20px] h-[60px] w-full lg:w-1/2 cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Wysyłanie..." : "Wyślij"}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
