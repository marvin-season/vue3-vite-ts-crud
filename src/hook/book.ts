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

export const useSpecBook: (
  url: string,
  id?: number | undefined
) => {
  book: Ref<BookDetailProps | null>;
  refetch: (id: number) => Promise<void>;
} = (url, id) => {
  const book = ref<BookDetailProps | null>(null);
  const refetch = async (id_: number) => {
    try {
      const data = await request(`${url}/${id_ ?? id}`);
      book.value = data;
    } catch (error) {}
  };

  return {
    refetch,
    book,
  };
};

export const usePutBook: (url: string) => {
  mutate: (book: { book: BookDetailProps }) => Promise<void>;
  isSaving: Ref<boolean>;
  error: Ref<string | null>;
} = (url) => {
  const isSaving = ref(false);
  const error = ref<string | null>(null);
  const mutate = async (book: { book: BookDetailProps }) => {
    isSaving.value = true;
    error.value = null;

    try {
      await request(`${url}`, {
        method: "PUT",
        data: book,
      });
    } catch (err) {
      error.value = "Failed to create book";
    } finally {
    }
  };

  return {
    isSaving,
    mutate,
    error,
  };
};


export const usePostBook: (url: string) => {
  mutate: (book: { book: BookDetailProps }) => Promise<void>;
  isSaving: Ref<boolean>;
  error: Ref<string | null>;
} = (url) => {
  const isSaving = ref(false);
  const error = ref<string | null>(null);
  const mutate = async (book: { book: BookDetailProps }) => {
    isSaving.value = true;
    error.value = null;

    try {
      await request(`${url}`, {
        method: "POST",
        data: book,
      });
    } catch (err) {
      error.value = "Failed to create book";
    } finally {
    }
  };

  return {
    isSaving,
    mutate,
    error,
  };
};