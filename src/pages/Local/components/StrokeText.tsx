import classes from '../styles/StrokeText.module.css'

interface StrokeTextProps {
  text: string;
  myclasses: string;
}

export const StrokeText: React.FC<StrokeTextProps> = ( { text, myclasses } ) => {
  return (
    <div className={`${ classes.container }`}>
      <p className={`${ classes.text } ${ myclasses }`}>{text}</p>
    </div>
  )
}
