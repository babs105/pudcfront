import React from "react";
import { useForm } from "react-hook-form";

const classes = {
  formContainer:
    "w-full bg-gray-800 h-screen flex flex-col items-center justify-center",
  headline: "pb-1 font-bold text-xl text-gray-400",
  form:
    "max-w-lg w-full text-gray-200 mt-4 px-8 md:px-0 flex flex-col justify-center items-center ",
  wrapperBlocInput:
    "w-full flex flex-col sm:flex-row sm:space-x-8 justify-between items-center",
  blocInput: "flex flex-col justify-center items-center h-full",
  inputContainer: "flex flex-col justify-center",
  label: " ",
  input:
    "bg-gray-700 mb-0 border border-gray-600 rounded-lg focus:border-gray-900 focus:outline-none focus:bg-gray-500 py-1 px-4 block w-full  ",
};
function FormContact() {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(watch("prenom"));
  return (
    // {errors.prenom && (
    //   <div class="bg-red-100 rounded mt-1 border-t-4 border-red-800 p-2">
    //     <p class="text-sm text-red-600">
    //       Prénom invalide et doit contenir 3 caracteres
    //     </p>
    //   </div>
    // )}
    // {errors.nom && (
    //   <div class="bg-red-100 rounded mt-1 border-t-4 border-red-800 p-2">
    //     <p class="text-sm text-red-600">Nom ne doit pas être vide</p>
    //   </div>
    // )}
    // {errors.email && (
    //   <div class="bg-red-100 rounded mt-1 border-t-4 border-red-800 p-2">
    //     <p class="text-sm text-red-600">Email est invalide</p>
    //   </div>
    // )}
    // {errors.titre && (
    //   <div class="bg-red-100 rounded mt-1 border-t-4 border-red-800 p-2">
    //     <p class="text-sm text-red-600">Titre ne doit pas vide</p>
    //   </div>
    // )}
    <div className={classes.formContainer} id="contact">
      <h2 className={classes.headline}>Inscrivez-vous</h2>
      <form
        data-aos="flip-left"
        className={classes.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={classes.wrapperBlocInput}>
          <div className={classes.blocInput}>
            <div className={classes.inputContainer}>
              <label className={classes.label} htmlFor="prenom">
                Prenom
              </label>
              <input
                className={classes.input}
                type="text"
                id="prenom"
                placeholder="Prénom"
                name="prenom"
                ref={register({ required: true, minLength: 3 })}
              />
              {errors.prenom && (
                <span class="text-sm font-bold text-red-600 ">
                  Prénom invalide
                </span>
              )}

              <label className={classes.label} htmlFor="nom">
                Nom
              </label>
              <input
                className={classes.input}
                type="text"
                id="nom"
                placeholder="Nom"
                name="nom"
                ref={register({ required: true })}
              />
              {errors.nom && (
                <span class="text-sm font-bold text-red-600 ">
                  Nom invalide
                </span>
              )}
            </div>
          </div>
          <div className={classes.blocInput}>
            <div className={classes.inputContainer}>
              <label className="mr-4" htmlFor="email">
                Email
              </label>
              <input
                className={classes.input}
                type="email"
                id="email"
                placeholder="baba@gmail.com"
                name="email"
                ref={register({ required: true })}
              />
              {errors.email && (
                <span className="text-sm font-bold text-red-600 ">
                  Email invalide
                </span>
              )}
              <label className={classes.label} htmlFor="titre">
                Titre
              </label>
              <input
                className={classes.input}
                id="titre"
                type="text"
                placeholder="titre"
                name="titre"
                ref={register({ required: true })}
              />
              {errors.titre && (
                <span className="text-sm font-bold text-red-600 ">
                  Titre invalide
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          className="bg-orange-500 text-sm mt-4  block 
                      rounded-lg py-2 px-12 sm:w-full focus:outline-none hover:bg-orange-500"
          type="submit"
        >
          OUVRIR COMPTE
        </button>
      </form>
    </div>
  );
}

export default FormContact;
