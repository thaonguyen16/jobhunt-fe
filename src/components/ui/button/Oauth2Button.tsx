type Oauth2ButtonProps = {
  children?: React.ReactNode;
  iconUrl: string;
  alt: string;
};
export default function Oauth2Button(props: Oauth2ButtonProps) {
  return (
    <button className="transition duration-75 w-10 h-10 hover:scale-110">
      <img src={props.iconUrl} alt={props.alt} />
    </button>
  );
}
