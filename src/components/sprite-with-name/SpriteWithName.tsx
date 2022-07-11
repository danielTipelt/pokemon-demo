import Image from "next/image";
import { usePokemonData } from "src/hooks/usePokemonData";
import { firstLetterCased } from "src/utils/firstLetterCased";

export function SpriteWithName(props: { detailsUrl: string; name: string }) {
  const { data, error, isInitialLoading } = usePokemonData(props.detailsUrl);

  return (
    <div className="flex gap-2">
      {isInitialLoading || error ? (
        <div title="Image is being loaded" className="w-11 h-11" />
      ) : (
        <Image
          src={data?.sprites?.front_default || ""}
          alt={`${props.name} image`}
          width={44}
          height={44}
        />
      )}
      <span>{firstLetterCased(props.name)}</span>
    </div>
  );
}
