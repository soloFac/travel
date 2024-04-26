import { useEffect, useMemo, useState } from 'react'

type ValidationFunction = ( value: any ) => boolean; // replace `any` with the actual type of your form values
type FormValidations = {
  [key: string]: [ValidationFunction, string];
};
type FormValidation = {
  [key: string]: string | null;
};


export const useForm = (
  initialForm: Record<string, any> = {}, formValidations: FormValidations = {}
) => {
  const [formState, setFormState] = useState( initialForm )
  const [formValidation, setFormValidation] = useState<FormValidation>( {} )

  useEffect( () => {
    createValidators()
  }, [formState] )

  useEffect( () => {
    setFormState( initialForm )
  }, [initialForm] )

  const isFormValid = useMemo( () => {
    for ( const formValue of Object.keys( formValidation ) ) {
      if ( formValidation[formValue] !== null ) return false
    }

    return true
  }, [formValidation] )

  const onInputChange = ( { target }: any ) => {
    const { name, value } = target
    setFormState( {
      ...formState,
      [name]: value
    } )
  }

  const onResetForm = () => {
    setFormState( initialForm )
  }

  const createValidators = () => {
    const formCheckedValues = {}

    for ( const formField of Object.keys( formValidations ) ) {
      const [fn, errorMessage] = formValidations[formField]

      const formCheckedValues: { [key: string]: string | null } = {};
      formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage
    }

    setFormValidation( formCheckedValues )
  }

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    ...formValidation,
    isFormValid
  }
}
