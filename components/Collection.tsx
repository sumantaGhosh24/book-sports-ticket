import {ISport} from "@/lib/models/sport.model";

import Card from "./Card";
import Pagination from "./Pagination";

type CollectionProps = {
  data: ISport[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?: "Sports_Organized" | "My_Tickets" | "All_Sports";
};

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
            {data.map((sport) => {
              const hasOrderLink = collectionType === "Sports_Organized";
              const hidePrice = collectionType === "My_Tickets";
              return (
                <Card
                  sport={sport}
                  hasOrderLink={hasOrderLink}
                  hidePrice={hidePrice}
                  key={sport._id}
                />
              );
            })}
          </div>
          {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-white py-28 text-center">
          <h3 className="font-bold text-xl">{emptyTitle}</h3>
          <p>{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default Collection;
