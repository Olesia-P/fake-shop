import css from "../styles/pageStyles/catalog.module.scss";
import Products from "../components/products/products";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeIsJewelery } from "../store/modules/catalogSlice";

export default function Catalog() {
  const { isJewelery } = useSelector(({ catalog }) => catalog);
  const dispatch = useDispatch();

  return (
    <div className={css.container}>
      <div className={css.sideMenu}>
        <label className={css.listItemSideMenu}>
          <input
            type="checkbox"
            checked={isJewelery}
            onChange={() => dispatch(changeIsJewelery(!isJewelery))}
          />
          Jewelery
        </label>
        <label className={css.listItemSideMenu}>
          <input type="checkbox" />
          Electronics
        </label>
        <label className={css.listItemSideMenu}>
          <input type="checkbox" />
          Men&apos;s clothing
        </label>
        <label className={css.listItemSideMenu}>
          <input type="checkbox" />
          Women&apos;s clothing
        </label>
      </div>
      <div className={css.productsArea}>
        <Products />
      </div>
    </div>
  );
}

//  Sed ut perspiciatis, unde omnis iste natus error sit voluptatem
//         accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab
//         illo inventore veritatis et quasi architecto beatae vitae dicta sunt,
//         explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut
//         odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione
//         voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum,
//         quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam
//         eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat
//         voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam
//         corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
//         Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse,
//         quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo
//         voluptas nulla pariatur? At vero eos et accusamus et iusto odio
//         dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti
//         atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati
//         cupiditate non provident, similique sunt in culpa, qui officia deserunt
//         mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum
//         facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis
//         est eligendi optio, cumque nihil impedit, quo minus id, quod maxime
//         placeat, facere possimus, omnis voluptas assumenda est, omnis dolor
//         repellendus. Temporibus autem quibusdam et aut officiis debitis aut
//         rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et
//         molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
//         delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut
//         perferendis doloribus asperiores repellat. Sed ut perspiciatis, unde
//         omnis iste natus error sit voluptatem accusantium doloremque laudantium,
//         totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi
//         architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam
//         voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia
//         consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt,
//         neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet,
//         consectetur, adipisci velit, sed quia non numquam eius modi tempora
//         incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim
//         ad minima veniam, quis nostrum exercitationem ullam corporis suscipit
//         laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel
//         eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil
//         molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas
//         nulla pariatur? At vero eos et accusamus et iusto odio dignissimos
//         ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti,
//         quos dolores et quas molestias excepturi sint, obcaecati cupiditate non
//         provident, similique sunt in culpa, qui officia deserunt mollitia animi,
//         id est laborum et dolorum fuga. Et harum quidem rerum facilis est et
//         expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi
//         optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere
//         possimus, omnis voluptas assumenda est, omnis dolor repellendus.
//         Temporibus autem quibusdam et aut officiis debitis aut rerum
//         necessitatibus saepe eveniet, ut et voluptates repudiandae sint et
//         molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
//         delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut
//         perferendis doloribus asperiores repellat. Sed ut perspiciatis, unde
//         omnis iste natus error sit voluptatem accusantium doloremque laudantium,
//         totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi
//         architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam
//         voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia
//         consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt,
//         neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet,
//         consectetur, adipisci velit, sed quia non numquam eius modi tempora
//         incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim
//         ad minima veniam, quis nostrum exercitationem ullam corporis suscipit
//         laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel
//         eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil
//         molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas
//         nulla pariatur? At vero eos et accusamus et iusto odio dignissimos
//         ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti,
//         quos dolores et quas molestias excepturi sint, obcaecati cupiditate non
//         provident, similique sunt in culpa, qui officia deserunt mollitia animi,
//         id est laborum et dolorum fuga. Et harum quidem rerum facilis est et
//         expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi
//         optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere
//         possimus, omnis voluptas assumenda est, omnis dolor repellendus.
//         Temporibus autem quibusdam et aut officiis debitis aut rerum
//         necessitatibus saepe eveniet, ut et voluptates repudiandae sint et
//         molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
//         delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut
//         perferendis doloribus asperiores repellat. Sed ut perspiciatis, unde
//         omnis iste natus error sit voluptatem accusantium doloremque laudantium,
//         totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi
//         architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam
//         voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia
//         consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt,
//         neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet,
//         consectetur, adipisci velit, sed quia non numquam eius modi tempora
//         incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim
//         ad minima veniam, quis nostrum exercitationem ullam corporis suscipit
//         laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel
//         eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil
//         molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas
//         nulla pariatur? At vero eos et accusamus et iusto odio dignissimos
//         ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti,
//         quos dolores et quas molestias excepturi sint, obcaecati cupiditate non
//         provident, similique sunt in culpa, qui officia deserunt mollitia animi,
//         id est laborum et dolorum fuga. Et harum quidem rerum facilis est et
//         expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi
//         optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere
//         possimus, omnis voluptas assumenda est, omnis dolor repellendus.
//         Temporibus autem quibusdam et aut officiis debitis aut rerum
//         necessitatibus saepe eveniet, ut et voluptates repudiandae sint et
//         molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
//         delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut
//         perferendis doloribus asperiores repellat. Sed ut perspiciatis, unde
//         omnis iste natus error sit voluptatem accusantium doloremque laudantium,
//         totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi
//         architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam
//         voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia
//         consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt,
//         neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet,
//         consectetur, adipisci velit, sed quia non numquam eius modi tempora
//         incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim
//         ad minima veniam, quis nostrum exercitationem ullam corporis suscipit
//         laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel
//         eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil
//         molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas
//         nulla pariatur? At vero eos et accusamus et iusto odio dignissimos
//         ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti,
//         quos dolores et quas molestias excepturi sint, obcaecati cupiditate non
//         provident, similique sunt in culpa, qui officia deserunt mollitia animi,
//         id est laborum et dolorum fuga. Et harum quidem rerum facilis est et
//         expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi
//         optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere
//         possimus, omnis voluptas assumenda est, omnis dolor repellendus.
//         Temporibus autem quibusdam et aut officiis debitis aut rerum
//         necessitatibus saepe eveniet, ut et voluptates repudiandae sint et
//         molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
//         delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut
//         perferendis doloribus asperiores repellat.
