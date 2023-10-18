import { Ref, onMounted, ref } from "vue";
import request from "@/utils/request";
import { BookDetailProps } from "@/types";
export function useBook(url: string): {
  isLoading: Ref<boolean>;
  books: Ref<BookDetailProps[]>;
  error: Ref<string | null>;
  refetch: () => Promise<void>;
} {
  const isLoading = ref(false);
  const books = ref<BookDetailProps[]>([]);
  const error = ref<string | null>(null);

  const refetch = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await request(url);
      books.value = data;
    } catch (err) {
      error.value = "Failed to fetch books";
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(refetch);

  return {
    isLoading,
    books,
    error,
    refetch,
  };
}

export function useBookDetail(url: string): {
  isLoading: Ref<boolean>;
  book: Ref<BookDetailProps | null>;
  error: Ref<string | null>;
  mutate: (id: number) => Promise<void>;
} {
  const isLoading = ref(false);
  const book = ref<BookDetailProps | null>(null);
  const error = ref<string | null>(null);

  const fetchBookDetail = async (id: number) => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await request(`${url}/${id}`);
      book.value = data;
    } catch (err) {
      error.value = "Failed to fetch book details";
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    // You can fetch initial data here if needed
  });

  return {
    isLoading,
    book,
    error,
    mutate: fetchBookDetail,
  };
}
