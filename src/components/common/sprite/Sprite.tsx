import Image from "next/image";
import { usePokemonData } from "src/hooks/usePokemonData";

export function Sprite(props: { detailsUrl: string; name: string }) {
  const { data, error, isInitialLoading } = usePokemonData(props.detailsUrl);
  if (isInitialLoading || error) {
    return <div title="Image is being loaded" className="w-11 h-11" />;
  }

  return (
    <div className="relative w-full h-full">
      <Image
        src={data?.sprites?.front_default || ""}
        alt={`${props.name} image`}
        layout="fill"
        title={props.name}
      />
    </div>
  );
}
