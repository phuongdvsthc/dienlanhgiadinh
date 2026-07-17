import { Search } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

const searchSuggestions = [
  "Đĩa xoay Sharp",
  "Đĩa lò vi sóng 27 cm",
  "Vòng xoay lò vi sóng",
  "Linh kiện máy lạnh",
  "Pin năng lượng mặt trời"
];

export function SearchBar() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 mb-20">
      <div className="bg-surface-lowest p-6 rounded-xl shadow-sm border border-border/50 flex flex-col gap-4 max-w-3xl mx-auto -mt-10 relative z-10">
        <div className="relative flex w-full">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
            <input 
              className="w-full h-14 pl-12 pr-4 bg-surface-variant/50 border border-border/50 rounded-l-md text-surface-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" 
              placeholder="Nhập tên sản phẩm, thương hiệu hoặc model thiết bị..." 
              type="text"
            />
          </div>
          <Button size="lg" className="rounded-l-none h-14 px-8">
            Tìm kiếm
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-muted font-semibold text-sm">Gợi ý:</span>
          {searchSuggestions.map((suggestion) => (
            <Badge key={suggestion} href="#">{suggestion}</Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
