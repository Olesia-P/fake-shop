import css from "../styles/pageStyles/catalog.module.scss";
import cx from "classnames";
import Products from "../components/products/products";
import { useState } from "react";
import { categories } from "../utils/objects";
import { capitalizeFirstLetter } from "../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { changeCatalogCategory } from "../store/modules/catalogSlice";
import { BiChevronDown } from "react-icons/bi";

export default function Catalog() {
  const { catalogCategory } = useSelector(({ catalog }) => catalog);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("A-Z");
  const [filterAccordion, setFilterAccordion] = useState();

  const addFilter = () => {
    if (filter === "A-Z" && catalogCategory === "") {
      dispatch(changeCatalogCategory(""));
      dispatch(changeCatalogCategory("?sort=desc"));
    } else if (filter === "Z-A" && catalogCategory === "") {
      dispatch(changeCatalogCategory(""));
      dispatch(changeCatalogCategory("?sort=asc"));
    } else if (filter === "A-Z" && catalogCategory !== "") {
      dispatch(changeCatalogCategory(""));
      dispatch(changeCatalogCategory(catalogCategory + "?sort=desc"));
    } else if (filter === "Z-A" && catalogCategory !== "") {
      dispatch(changeCatalogCategory(""));
      dispatch(changeCatalogCategory(catalogCategory + "?sort=asc"));
    }
  };

  console.log(catalogCategory);

  return (
    <div className={css.container}>
      <div className={css.sideMenu}>
        <div className={css.list}>
          {categories.map((element) => (
            <label key={element.name} className={css.listItemSideMenu}>
              <input
                type="radio"
                name="productsType"
                onChange={() => {
                  dispatch(changeCatalogCategory(element.link));
                }}
                checked={catalogCategory === element.link}
              />
              {capitalizeFirstLetter(element.name)}
            </label>
          ))}
        </div>
        <div className={cx(css.filter, filterAccordion && css.open)}>
          <div className={css.filterHeader}>Filter:</div>
          <div className={css.filterListWrap}>
            <div className={css.filterChosen}>{filter}</div>
            <div className={css.filterAccordion}>
              <div
                className={css.filterOption}
                onClick={() => {
                  setFilterAccordion(false), setFilter("A-Z"), addFilter();
                }}
              >
                A-Z
              </div>
              <div
                className={css.filterOption}
                onClick={() => {
                  setFilterAccordion(false), setFilter("Z-A"), addFilter();
                }}
              >
                Z-A
              </div>
            </div>
          </div>
          <div
            className={css.chevron}
            onClick={() => setFilterAccordion(!filterAccordion)}
          >
            <BiChevronDown />
          </div>
        </div>
      </div>
      <div className={css.productsArea}>
        <Products category={catalogCategory} />
      </div>
    </div>
  );
}

//&apos;
// const [category, setCategory] = useState("");
// const handleRadioButton = (categoryName) => {
// setCategory(categoryName);
// };

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
