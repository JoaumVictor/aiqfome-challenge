export interface SelectedOptionItem {
  optionId: string;
  name: string;
  price: number;
}

export interface SelectedProductOption {
  id: string; // ID do grupo de opções (ex: ID de "Qual o tamanho?")
  title: string; // Título do grupo (ex: "Qual o tamanho?")
  type: string;
  items: SelectedOptionItem[]; // Itens selecionados dentro desse grupo
}

// Define a estrutura de um item no carrinho
export interface CartItem {
  id: string; // ID único do item no carrinho (gerado, não o productId)
  storeId: string; // ID da loja do item
  productId: string; // ID do produto base
  productName: string; // Nome do produto base
  productImageUrl: string; // URL da imagem do produto base
  basePrice: number; // Preço base do produto
  selectedOptions: SelectedProductOption[]; // Opções customizadas selecionadas pelo usuário
  quantity: number;
  itemTotalPrice: number; // Preço total deste item (basePrice + opções * quantidade)
}
