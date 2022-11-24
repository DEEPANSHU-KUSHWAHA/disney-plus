import { MinusSmallIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { use } from "react";
import api from "../../../library/api";
import type { Movie } from "../../../types";
import Button from "../../elements/button";

type Props = {
  movie: Movie;
};

const Showcase = ({ movie }: Props) => {
  const logo = use(api.get.movie.logo(movie.id));

  return (
    <section className="max-w-md space-y-4">
      <div className="relative aspect-video w-full">
        <Image
          src={logo.image!}
          alt={movie.title!}
          fill
          className="object-contain"
        />
      </div>
      <div className="flex items-center gap-2">
        <p className="font-semibold">
          {movie.releasedAt?.slice(0, 4)} • 1h 59mm •{" "}
          {movie.language!.original!.toUpperCase()} •
        </p>
        <div className="rounded bg-rated-dark px-2 font-semibold">PG</div>
      </div>
      <p className="hidden desktop:block">{movie.overview!.slice(0, 100)}</p>
      <ul className="flex items-center gap-2 font-semibold">
        <li>Fantasy</li>
        <MinusSmallIcon className="h-6 w-6 rotate-90" />
        <li>Family</li>
        <MinusSmallIcon className="h-6 w-6 rotate-90" />
        <li>Comedy</li>
      </ul>
      <div className="flex gap-4">
        <Button variant={{ name: "primary", type: "play" }} />
        <Button variant={{ name: "primary", type: "save" }} />
      </div>
    </section>
  );
};

export default Showcase;