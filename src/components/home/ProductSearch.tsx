import { Badge } from '../ui/Badge';
import { Container } from '../ui/Container';
import { SearchInput } from '../ui/SearchInput';
import { searchSuggestionsData } from '../../data/products';

export function ProductSearch() {
  return (
    <section className="mb-section-md">
      <Container>
        <div className="bg-background p-6 rounded-lg shadow-sm border border-border/50 flex flex-col gap-4 max-w-3xl mx-auto -mt-10 relative z-10">
        <SearchInput 
          placeholder="Nhập tên sản phẩm, thương hiệu hoặc model thiết bị..."
          buttonText="Tìm kiếm"
        />
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-text-accent font-semibold text-sm">Gợi ý:</span>
          {searchSuggestionsData.map((suggestion) => (
            <Badge key={suggestion} href="#">{suggestion}</Badge>
          ))}
        </div>
        </div>
      </Container>
    </section>
  );
}
