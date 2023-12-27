import {auth} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import {ArrowRight, Pen} from "lucide-react";

import {ISport} from "@/lib/models/sport.model";
import {formatDateTime} from "@/lib/utils";

import {DeleteConfirmation} from "./DeleteConfirmation";
import {Badge} from "./ui/badge";
import {Separator} from "./ui/separator";

type CardProps = {
  sport: ISport;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = ({sport, hasOrderLink, hidePrice}: CardProps) => {
  const {sessionClaims} = auth();
  const userId = sessionClaims?.userId as string;

  const isSportCreator = userId === sport.organizer._id.toString();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md overflow-hidden relative">
      <Link href={`/sports/${sport._id}`}>
        <Image
          src={sport.imageUrl}
          alt="Card Image"
          className="w-full h-40 object-cover rounded-md mb-4 transform transition-transform hover:scale-105"
          height={100}
          width={100}
          unoptimized
        />
      </Link>
      {isSportCreator && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-primary text-white p-3 shadow-sm transition-all">
          <Link href={`/sports/${sport._id}/update`}>
            <Pen size={24} />
          </Link>
          <Separator />
          <DeleteConfirmation sportId={sport._id} />
        </div>
      )}
      {!hidePrice && (
        <div className="flex gap-2 mb-4">
          {sport.price === "0" ? (
            <Badge>FREE</Badge>
          ) : (
            <Badge>₹ {sport.price}</Badge>
          )}
          <Badge className="line-clamp-1" variant="secondary">
            {sport.category.name}
          </Badge>
        </div>
      )}
      <p className="mb-2">{formatDateTime(sport.startDateTime).dateTime}</p>
      <Link href={`/sports/${sport._id}`}>
        <p className="text-xl font-bold mb-2">{sport.title}</p>
      </Link>
      <div className="flex items-center justify-between w-full">
        <p className="text-xs font-bold">
          By, {sport.organizer.firstName} {sport.organizer.lastName}
        </p>
        {hasOrderLink && (
          <Link href={`/orders?sportId=${sport._id}`} className="flex gap-2">
            <p className="text-primary-500">Order Details</p>
            <ArrowRight size={24} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Card;
