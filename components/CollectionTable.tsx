import Link from "next/link";

import {IOrder} from "@/lib/models/order.model";
import {formatDateTime} from "@/lib/utils";

import Pagination from "./Pagination";
import {Badge} from "./ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export type CollectionProps = {
  data: IOrder[];
  emptyTitle: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  type: string;
};

const CollectionTable = ({
  data,
  emptyTitle,
  page,
  totalPages = 0,
  urlParamName,
  type,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <>
          <Table>
            <TableCaption>A list of your recent ticket.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order Id</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Sport</TableHead>
                {type === "admin" && <TableHead>User</TableHead>}
                <TableHead>Order Status</TableHead>
                <TableHead>Is Paid</TableHead>
                <TableHead>Paid At</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="font-medium">{order._id}</TableCell>
                  <TableCell>
                    {order.paymentResult.razorpay_order_id} |{" "}
                    {order.paymentResult.razorpay_payment_id}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/sports/${order.sport._id}`}
                      className="underline text-primary"
                    >
                      {order.sport.title}
                    </Link>
                  </TableCell>
                  {type === "admin" && (
                    <TableCell className="capitalize">
                      {order.buyer.firstName} {order.buyer.lastName}
                    </TableCell>
                  )}
                  <TableCell className="uppercase">
                    {order.orderStatus}
                  </TableCell>
                  <TableCell>
                    {order.isPaid ? (
                      <Badge variant="default">Paid</Badge>
                    ) : (
                      <Badge variant="destructive">Not Paid</Badge>
                    )}
                  </TableCell>
                  <TableCell>{formatDateTime(order.paidAt).dateTime}</TableCell>
                  <TableCell className="text-right">
                    {order.totalPrice}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </>
      ) : (
        <p className="text-center font-bold text-red-800">{emptyTitle}</p>
      )}
    </>
  );
};

export default CollectionTable;
