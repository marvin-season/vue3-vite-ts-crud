import { Ref, ref } from "vue";
import request from "@/utils/request";
import { BookDetailProps } from "@/types";

const useGetBook: (
  url: string,
  id?: number
) => {
  data: Ref<BookDetailProps | BookDetailProps[] | null>;
  refetch: (id?: number) => Promise<void>;
} = (url, id) => {
  const book = ref<BookDetailProps | null>(null);
  const refetch = async (id_?: number) => {
    try {
      const data = await request(`${url}/${id_ ?? id ?? ""}`);
      book.value = data;
    } catch (error) {}
  };

  return {
    refetch,
    data: book,
  };
};

export const useBooks: (url: string) => {
  data: Ref<BookDetailProps[] | null>;
  refetch: () => Promise<void>;
} = (url) => {
  const { refetch, data: d } = useGetBook(url);
  const data = d as Ref<BookDetailProps[] | null>;
  return {
    refetch,
    data,
  };
};

export const useSpecBook: (
  url: string,
  id?: number | undefined
) => {
  data: Ref<BookDetailProps | null>;
  refetch: (id: number) => Promise<void>;
} = (url, id) => {
  const { refetch, data: d } = useGetBook(url, id);
  const data = d as Ref<BookDetailProps | null>;
  return {
    refetch: refetch as (id: number) => Promise<void>,
    data,
  };
};

export const usePutBook: (url: string) => {
  mutate: (book: BookDetailProps & { id?: number }) => Promise<void>;
  isSaving: Ref<boolean>;
} = (url) => {
  return useSaveBook(url);
};

export const usePostBook: (url: string) => {
  mutate: (book: BookDetailProps & { id?: number }) => Promise<void>;
  isSaving: Ref<boolean>;
} = (url) => {
  return useSaveBook(url);
};

export const useSaveBook: (url: string) => {
  mutate: (book: BookDetailProps & { id?: number }) => Promise<void>;
  isSaving: Ref<boolean>;
} = (url) => {
  const isSaving = ref(false);

  const mutate = async (book: BookDetailProps & { id?: number }) => {
    isSaving.value = true;
    try {
      await request(`${url}`, {
        method: book.id != -1 ? "PUT" : "POST",
        data: { book },
      });
    } catch (err) {
    } finally {
    }
  };

  return {
    isSaving,
    mutate,
  };
};

export const useDeleteBook: (url: string) => {
  mutate: (id: number) => Promise<void>;
} = (url) => {
  const mutate = async (id: number) => {
    try {
      request(`${url}/${id}`, {
        method: "DELETE",
      });
    } catch (error) {}
  };

  return {
    mutate,
  };
};
