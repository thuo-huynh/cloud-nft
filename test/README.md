Đoạn code trên là một test case kiểm tra việc list NFT trên marketplace. Dưới đây là giải thích chi tiết từng phần:

### 1. **Khởi tạo môi trường test:**

```javascript
const { hardhatToken, marketplace, addr1 } = await loadFixture(
  deployTokenFixture
);
```

- **`loadFixture(deployTokenFixture)`**: Khởi tạo môi trường test bằng cách deploy các contract (ERC721 token và Marketplace) và thiết lập các tài khoản ảo. Kết quả trả về bao gồm:
  - `hardhatToken`: Contract của NFT.
  - `marketplace`: Contract của marketplace.
  - `addr1`: Một địa chỉ ví thử nghiệm.

---

### 2. **Mint NFT cho người dùng:**

```javascript
await hardhatToken.giveAway(addr1.address);
expect(await hardhatToken.balanceOf(addr1.address)).to.equal(1);
```

- **`giveAway(addr1.address)`**: Hàm này mint một NFT (Token ID 0) cho địa chỉ `addr1`.
- **`expect(...).to.equal(1)`**: Kiểm tra xem `addr1` đã sở hữu chính xác 1 NFT chưa.

---

### 3. **Lấy phí listing từ marketplace:**

```javascript
const listingPrice = await marketplace.listingPrice();
console.log("Listing Price: ", listingPrice.toString());
```

- **`listingPrice`**: Là phí (thường là ETH) cần trả để list NFT lên marketplace. Giá trị này được định nghĩa trong contract marketplace.
- In giá trị phí ra console để debug.

---

### 4. **Approve và List NFT:**

```javascript
await hardhatToken.connect(addr1).approve(marketplace.address, 0);
await marketplace
  .connect(addr1)
  .listItem(hardhatToken.address, 0, ethers.utils.parseEther("0.1"), {
    value: listingPrice,
  });
```

- **Bước 1: Approve**:
  - **`approve(marketplace.address, 0)`**: Cho phép marketplace được quyền chuyển NFT (Token ID 0) từ ví của `addr1`. Đây là bắt buộc để marketplace có thể xử lý giao dịch.
- **Bước 2: List NFT**:
  - **`listItem(...)`**: Gọi hàm listItem trên marketplace với các tham số:
    - `hardhatToken.address`: Địa chỉ contract NFT.
    - `0`: Token ID của NFT muốn list.
    - `ethers.utils.parseEther("0.1")`: Giá bán NFT (0.1 ETH).
    - `{ value: listingPrice }`: Trả phí listing kèm theo giao dịch.

---

### 5. **Kiểm tra quyền sở hữu sau khi list:**

```javascript
expect(await hardhatToken.ownerOf(0)).to.equal(marketplace.address);
```

- **`ownerOf(0)`**: Kiểm tra owner hiện tại của Token ID 0.
- **Kỳ vọng**: Sau khi list, owner phải là `marketplace`. Điều này cho thấy NFT đã được chuyển từ `addr1` sang marketplace, chứng tỏ việc list thành công.

---

### **Tổng quan logic:**

- **Mục đích test**: Đảm bảo rằng một NFT có thể được chuyển đến marketplace và list với giá mong muốn.
- **Luồng chính**:
  1. Mint NFT cho người dùng.
  2. Người dùng approve marketplace.
  3. Người dùng list NFT với giá và trả phí.
  4. Kiểm tra NFT đã được chuyển đến marketplace.

---

### **Giải thích kỹ thuật:**

- **Transfer Ownership**: Khi list NFT, marketplace thường trở thành owner tạm thời để có thể chuyển NFT cho người mua khi có giao dịch.
- **Phí listing**: Là phí duy trì để đảm bảo tính nghiêm túc của người bán, tránh spam.
- **Cơ chế approve**: Bảo mật ERC721 yêu cầu chủ sở hữu phải chủ động approve quyền chuyển NFT cho một địa chỉ khác (ở đây là marketplace).
