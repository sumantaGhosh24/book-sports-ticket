import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";

import {SearchParamProps} from "@/types";
import {getAllSports} from "@/lib/actions/sport.actions";
import Search from "@/components/Search";
import CategoryFilter from "@/components/CategoryFilter";
import Collection from "@/components/Collection";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home({searchParams}: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const sports = await getAllSports({
    query: searchText,
    category,
    page,
    limit: 6,
  });

  return (
    <>
      <div className="p-8 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4">Book Sports Ticket</h1>
          <p className="text-lg mb-6">
            Book your favorite match ticket with reasonable price.
          </p>
          <Link
            href="#sports"
            className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/70"
          >
            Explore More
          </Link>
        </div>
        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <Image
            src="/hero.jpg"
            alt="Hero Image"
            className="w-full h-auto rounded-md"
            height={100}
            width={100}
            unoptimized
          />
        </div>
      </div>
      <div className="p-8 my-5" id="sports">
        <div className="text-left mb-8">
          <h2 className="text-3xl font-bold mb-4">Latest Sports</h2>
          <p className="text-gray-600">
            Explore the next matches with exciting offers.
          </p>
        </div>
        <div className="flex w-full flex-col md:flex-row gap-5 mb-8">
          <Search />
          <CategoryFilter />
        </div>
        <div>
          <Collection
            data={sports?.data}
            emptyTitle="No Sports Found"
            emptyStateSubtext="Try again later"
            collectionType="All_Sports"
            limit={6}
            page={page}
            totalPages={sports?.totalPages}
          />
        </div>
      </div>
    </>
  );
}
