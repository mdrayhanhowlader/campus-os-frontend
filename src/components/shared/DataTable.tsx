'use client';

import { useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
} from '@tanstack/react-table';
import {
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
  Search, SlidersHorizontal, ChevronUp, ChevronDown, ChevronsUpDown,
} from 'lucide-react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  searchKey?: string;
  searchPlaceholder?: string;
  isLoading?: boolean;
  toolbarActions?: React.ReactNode;
  emptyMessage?: string;
  emptyDescription?: string;
  // Server-side pagination
  serverSide?: boolean;
  pageCount?: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  onSearchChange?: (value: string) => void;
}

function SortIndicator({ sorted }: { sorted: false | 'asc' | 'desc' }) {
  if (!sorted) return <ChevronsUpDown className="ml-1.5 h-3 w-3 text-muted-foreground opacity-50" />;
  return sorted === 'asc'
    ? <ChevronUp className="ml-1.5 h-3 w-3 text-blue-600" />
    : <ChevronDown className="ml-1.5 h-3 w-3 text-blue-600" />;
}

function EmptyState({ message, description }: { message: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
        <Search className="h-8 w-8 text-gray-400" />
      </div>
      <p className="text-sm font-medium text-gray-900 dark:text-white">{message}</p>
      {description && <p className="mt-1 text-xs text-muted-foreground max-w-xs">{description}</p>}
    </div>
  );
}

function LoadingSkeleton({ cols }: { cols: number }) {
  return (
    <>
      {Array.from({ length: 6 }).map((_, rowIdx) => (
        <TableRow key={rowIdx}>
          {Array.from({ length: cols }).map((_, colIdx) => (
            <TableCell key={colIdx}>
              <Skeleton className="h-4 w-full rounded" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

export function DataTable<TData>({
  data,
  columns,
  searchKey,
  searchPlaceholder = 'Search...',
  isLoading = false,
  toolbarActions,
  emptyMessage = 'No results found',
  emptyDescription,
  serverSide = false,
  pageCount,
  page = 1,
  pageSize = 20,
  onPageChange,
  onPageSizeChange,
  onSearchChange,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [localSearch, setLocalSearch] = useState('');

  const table = useReactTable({
    data,
    columns,
    pageCount: serverSide ? pageCount : undefined,
    manualPagination: serverSide,
    manualFiltering: serverSide,
    manualSorting: serverSide,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination: serverSide ? { pageIndex: page - 1, pageSize } : undefined,
    } as any,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: !serverSide ? getFilteredRowModel() : undefined!,
    getPaginationRowModel: !serverSide ? getPaginationRowModel() : undefined!,
  });

  const handleSearch = (value: string) => {
    setLocalSearch(value);
    if (serverSide) {
      onSearchChange?.(value);
    } else if (searchKey) {
      table.getColumn(searchKey)?.setFilterValue(value);
    }
  };

  const currentPage = serverSide ? page : table.getState().pagination.pageIndex + 1;
  const totalPages = serverSide ? (pageCount ?? 1) : table.getPageCount();

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={localSearch}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          {toolbarActions}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      'text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap py-3',
                      header.column.getCanSort() && 'cursor-pointer select-none'
                    )}
                    onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <SortIndicator sorted={header.column.getIsSorted()} />
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <LoadingSkeleton cols={columns.length} />
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/30"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3 text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-64 text-center">
                  <EmptyState message={emptyMessage} description={emptyDescription} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Rows per page</span>
          <Select
            value={String(pageSize)}
            onValueChange={(val) => onPageSizeChange?.(Number(val))}
          >
            <SelectTrigger className="h-8 w-16">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 50, 100].map((size) => (
                <SelectItem key={size} value={String(size)}>{size}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="hidden sm:inline">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="h-8 w-8"
            disabled={currentPage <= 1}
            onClick={() => onPageChange?.(1) ?? table.setPageIndex(0)}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8"
            disabled={currentPage <= 1}
            onClick={() => onPageChange?.(currentPage - 1) ?? table.previousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Page number pills */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const p = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
            return (
              <Button
                key={p}
                variant={p === currentPage ? 'default' : 'outline'}
                size="icon"
                className="h-8 w-8 text-xs"
                onClick={() => onPageChange?.(p) ?? table.setPageIndex(p - 1)}
              >
                {p}
              </Button>
            );
          })}

          <Button variant="outline" size="icon" className="h-8 w-8"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange?.(currentPage + 1) ?? table.nextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange?.(totalPages) ?? table.setPageIndex(totalPages - 1)}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
