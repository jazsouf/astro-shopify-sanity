<script lang="ts">
  import { preventDefault } from 'svelte/legacy';

  import { addCartItem, isCartUpdating, cart } from "../stores/cart";
  import type { VariantResult } from "../data/shopify/schemas";
  import type { z } from "zod";

  interface Props {
    variantId: string;
    variantQuantityAvailable: number;
    variantAvailableForSale: boolean;
    variants: z.infer<typeof VariantResult>[];
  }

  let { variantId, variantQuantityAvailable, variantAvailableForSale, variants }: Props = $props();

  // Get selected variant from URL parameters
  let selectedVariantId = $state(variantId);
  let selectedVariant = $derived(variants.find(v => v.id === selectedVariantId) || variants[0]);

  // Update selected variant when URL changes
  function updateSelectedVariant() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlVariantId = urlParams.get('variant');
    if (urlVariantId && urlVariantId !== selectedVariantId) {
      selectedVariantId = urlVariantId;
    }
  }

  // Listen for variant change events and URL changes
  if (typeof window !== 'undefined') {
    // Listen for custom variant change events
    window.addEventListener('variantChanged', (event) => {
      const customEvent = event as CustomEvent<{ variantId: string }>;
      const { variantId: newVariantId } = customEvent.detail;
      if (newVariantId && newVariantId !== selectedVariantId) {
        selectedVariantId = newVariantId;
      }
    });
    
    window.addEventListener('popstate', updateSelectedVariant);
    // Check URL on component mount
    updateSelectedVariant();
  }

  // Check if the selected variant is already in the cart and if there are any units left
  let variantInCart =
    $derived($cart &&
    $cart.lines?.nodes.filter((item) => item.merchandise.id === selectedVariantId)[0]);
  let noQuantityLeft =
    $derived(variantInCart && selectedVariant && selectedVariant.quantityAvailable <= (variantInCart?.quantity || 0));

  function addToCart(e: Event) {
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const { id, quantity } = Object.fromEntries(formData);
    const item = {
      id: id as string,
      quantity: parseInt(quantity as string),
    };
    addCartItem(item);
  }
</script>

<form onsubmit={preventDefault((e) => addToCart(e))}>
  <input type="hidden" name="id" value={selectedVariantId} />
  <input type="hidden" name="quantity" value="1" />

  <button
    type="submit"
    class="button mt-10 w-full"
    disabled={$isCartUpdating || noQuantityLeft || !selectedVariant?.availableForSale}
  >
    {#if $isCartUpdating}
      <svg
        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    {/if}
    {#if selectedVariant?.availableForSale}
      Add to bag
    {:else}
      Sold out
    {/if}
  </button>
  {#if noQuantityLeft}
    <div class="text-center text-red-600">
      <small>All units left are in your cart</small>
    </div>
  {/if}
</form>
