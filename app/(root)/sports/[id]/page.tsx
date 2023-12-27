import type {Metadata} from "next";
import {Calendar, LocateIcon} from "lucide-react";
import Image from "next/image";

import {SearchParamProps} from "@/types";
import {
  getRelatedSportsByCategory,
  getSportById,
} from "@/lib/actions/sport.actions";
import {Badge} from "@/components/ui/badge";
import CheckoutButton from "@/components/CheckoutButton";
import {formatDateTime} from "@/lib/utils";
import Collection from "@/components/Collection";

export const metadata: Metadata = {
  title: "Detailed Sport",
};

const SportDetails = async ({params: {id}, searchParams}: SearchParamProps) => {
  const sport = await getSportById(id);

  const relatedSports = await getRelatedSportsByCategory({
    categoryId: sport.category._id,
    sportId: sport._id,
    page: searchParams.page as string,
  });

  return (
    <div className="bg-white rounded shadow mt-10">
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image
            src={sport.imageUrl}
            alt="hero image"
            width={1000}
            height={1000}
            className="h-full min-h-[300px] object-cover object-center"
          />
          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="text-xl font-bold">{sport.title}</h2>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  {sport.price === "0" ? (
                    <Badge>Free</Badge>
                  ) : (
                    <Badge>₹ {sport.price}</Badge>
                  )}
                  <Badge className="line-clamp-1" variant="secondary">
                    {sport.category.name}
                  </Badge>
                </div>
                <p className="ml-2 mt-2 sm:mt-0 font-bold">
                  by,{" "}
                  <span className="text-primary capitalize">
                    {sport.organizer.firstName} {sport.organizer.lastName}
                  </span>
                </p>
              </div>
            </div>{" "}
            <div className="flex flex-col gap-5">
              <div className="flex gap-2 md:gap-3">
                <Calendar size={24} />
                <div className="flex flex-wrap items-center">
                  <p>
                    {formatDateTime(sport.startDateTime).dateOnly} -{" "}
                    {formatDateTime(sport.startDateTime).timeOnly}
                  </p>
                  <p>
                    {formatDateTime(sport.endDateTime).dateOnly} -{" "}
                    {formatDateTime(sport.endDateTime).timeOnly}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <LocateIcon size={24} />
                <p>{sport.location}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p>{sport.description}</p>
              <p className="truncate text-primary underline">{sport.url}</p>
            </div>
          </div>
        </div>
      </section>
      <CheckoutButton sport={sport} />
      <section className="my-8 flex flex-col gap-8 md:gap-12 ml-5">
        <h2 className="text-3xl font-bold">Related Sports</h2>
        <Collection
          data={relatedSports?.data}
          emptyTitle="No Sports Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Sports"
          limit={3}
          page={searchParams.page as string}
          totalPages={relatedSports?.totalPages}
        />
      </section>
    </div>
  );
};

export default SportDetails;
