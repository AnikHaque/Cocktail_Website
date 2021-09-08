const drinksContainer = document.getElementById('drinks-container');
const errorMsg = document.getElementById('error-msg');
const searchSection = document.getElementById('search-section');
const singleDrinkItem = document.getElementById('single-drink');
const footer = document.getElementById('footer');
const toggleSpin = document.getElementById('spinner');

const xssRegex = /<[^\w<>]*(?:[^<>"'\s]*:)?[^\w<>]*(?:\W*s\W*c\W*r\W*i\W*p\W*t|\W*f\W*o\W*r\W*m|\W*s\W*t\W*y\W*l\W*e|\W*s\W*v\W*g|\W*m\W*a\W*r\W*q\W*u\W*e\W*e|(?:\W*l\W*i\W*n\W*k|\W*o\W*b\W*j\W*e\W*c\W*t|\W*e\W*m\W*b\W*e\W*d|\W*a\W*p\W*p\W*l\W*e\W*t|\W*p\W*a\W*r\W*a\W*m|\W*i?\W*f\W*r\W*a\W*m\W*e|\W*b\W*a\W*s\W*e|\W*b\W*o\W*d\W*y|\W*m\W*e\W*t\W*a|\W*i\W*m\W*a?\W*g\W*e?|\W*v\W*i\W*d\W*e\W*o|\W*a\W*u\W*d\W*i\W*o|\W*b\W*i\W*n\W*d\W*i\W*n\W*g\W*s|\W*s\W*e\W*t|\W*i\W*s\W*i\W*n\W*d\W*e\W*x|\W*a\W*n\W*i\W*m\W*a\W*t\W*e)[^>\w])|(?:<\w[\s\S]*[\s\0\/]|['"])(?:formaction|style|background|src|lowsrc|ping|on(?:d(?:e(?:vice(?:(?:orienta|mo)tion|proximity|found|light)|livery(?:success|error)|activate)|r(?:ag(?:e(?:n(?:ter|d)|xit)|(?:gestur|leav)e|start|drop|over)?|op)|i(?:s(?:c(?:hargingtimechange|onnect(?:ing|ed))|abled)|aling)|ata(?:setc(?:omplete|hanged)|(?:availabl|chang)e|error)|urationchange|ownloading|blclick)|Moz(?:M(?:agnifyGesture(?:Update|Start)?|ouse(?:PixelScroll|Hittest))|S(?:wipeGesture(?:Update|Start|End)?|crolledAreaChanged)|(?:(?:Press)?TapGestur|BeforeResiz)e|EdgeUI(?:C(?:omplet|ancel)|Start)ed|RotateGesture(?:Update|Start)?|A(?:udioAvailable|fterPaint))|c(?:o(?:m(?:p(?:osition(?:update|start|end)|lete)|mand(?:update)?)|n(?:t(?:rolselect|extmenu)|nect(?:ing|ed))|py)|a(?:(?:llschang|ch)ed|nplay(?:through)?|rdstatechange)|h(?:(?:arging(?:time)?ch)?ange|ecking)|(?:fstate|ell)change|u(?:echange|t)|l(?:ick|ose))|m(?:o(?:z(?:pointerlock(?:change|error)|(?:orientation|time)change|fullscreen(?:change|error)|network(?:down|up)load)|use(?:(?:lea|mo)ve|o(?:ver|ut)|enter|wheel|down|up)|ve(?:start|end)?)|essage|ark)|s(?:t(?:a(?:t(?:uschanged|echange)|lled|rt)|k(?:sessione|comma)nd|op)|e(?:ek(?:complete|ing|ed)|(?:lec(?:tstar)?)?t|n(?:ding|t))|u(?:ccess|spend|bmit)|peech(?:start|end)|ound(?:start|end)|croll|how)|b(?:e(?:for(?:e(?:(?:scriptexecu|activa)te|u(?:nload|pdate)|p(?:aste|rint)|c(?:opy|ut)|editfocus)|deactivate)|gin(?:Event)?)|oun(?:dary|ce)|l(?:ocked|ur)|roadcast|usy)|a(?:n(?:imation(?:iteration|start|end)|tennastatechange)|fter(?:(?:scriptexecu|upda)te|print)|udio(?:process|start|end)|d(?:apteradded|dtrack)|ctivate|lerting|bort)|DOM(?:Node(?:Inserted(?:IntoDocument)?|Removed(?:FromDocument)?)|(?:CharacterData|Subtree)Modified|A(?:ttrModified|ctivate)|Focus(?:Out|In)|MouseScroll)|r(?:e(?:s(?:u(?:m(?:ing|e)|lt)|ize|et)|adystatechange|pea(?:tEven)?t|movetrack|trieving|ceived)|ow(?:s(?:inserted|delete)|e(?:nter|xit))|atechange)|p(?:op(?:up(?:hid(?:den|ing)|show(?:ing|n))|state)|a(?:ge(?:hide|show)|(?:st|us)e|int)|ro(?:pertychange|gress)|lay(?:ing)?)|t(?:ouch(?:(?:lea|mo)ve|en(?:ter|d)|cancel|start)|ime(?:update|out)|ransitionend|ext)|u(?:s(?:erproximity|sdreceived)|p(?:gradeneeded|dateready)|n(?:derflow|load))|f(?:o(?:rm(?:change|input)|cus(?:out|in)?)|i(?:lterchange|nish)|ailed)|l(?:o(?:ad(?:e(?:d(?:meta)?data|nd)|start)?|secapture)|evelchange|y)|g(?:amepad(?:(?:dis)?connected|button(?:down|up)|axismove)|et)|e(?:n(?:d(?:Event|ed)?|abled|ter)|rror(?:update)?|mptied|xit)|i(?:cc(?:cardlockerror|infochange)|n(?:coming|valid|put))|o(?:(?:(?:ff|n)lin|bsolet)e|verflow(?:changed)?|pen)|SVG(?:(?:Unl|L)oad|Resize|Scroll|Abort|Error|Zoom)|h(?:e(?:adphoneschange|l[dp])|ashchange|olding)|v(?:o(?:lum|ic)e|ersion)change|w(?:a(?:it|rn)ing|heel)|key(?:press|down|up)|(?:AppComman|Loa)d|no(?:update|match)|Request|zoom))[\s\0]*=/g;

const loadSpinner = (displaySpinner) => {
        toggleSpin.style.display = displaySpinner;
}
loadSpinner('block');
// Load Default items:
function loadDefaultItems() {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail`)
                .then(res => res.json())
                .then(data => showDefaultItem(data.drinks))
        footer.style.marginTop = '320px';
}
loadDefaultItems()
// Show Default Items:
const showDefaultItem = (drinks) => {
        // console.log(drinks);

        drinks.slice(0, 12).map(drink => {

                //Prevents any potential XSS in future
                if(drink.strDrink.match(xssRegex) || 
                        drink.strDrinkThumb.match(xssRegex) || 
                        drink.idDrink.match(xssRegex)) return;
                
                console.log(Object.keys(drink));

                const div = document.createElement('div');
                
                div.innerHTML = `
                                <div onclick=singleDrink('${drink.idDrink}') class="col">
                                        <div class="card drinks">
                                                <img src="${drink.strDrinkThumb}" class="img-fluid p-4 rounded-3" alt="...">
                                                <div class="card-body">
                                                        <h5 class="card-title">${drink.strDrink}</h5>
                                                        <p class="card-text"></p>
                                                </div>
                                        </div>
                                </div>
                                `;
                drinksContainer.appendChild(div);
                footer.style.marginTop = 0;
        });

        loadSpinner('none');
}

// Search Field:
document.getElementById('search-btn').addEventListener('click', function () {
        loadSpinner('block');
        singleDrinkItem.textContent = '';
        drinksContainer.textContent = '';
        errorMsg.textContent = '';
        const searchField = document.getElementById('search-field');
        const searchText = searchField.value;

        // Condition For Search Option:
        if (searchText.length == 0) {
                const div = document.createElement('div');
                div.innerHTML = `
                        <h4 class="text-danger text-center">Please write drinks name...</h4>
                `;
                errorMsg.appendChild(div);
                footer.style.marginTop = '320px';
                loadSpinner('none');
        }

        // Fetch URL:
        else if (searchText.length == 1) {
                // Searchwith single word:
                fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchText}`)
                        .then(res => res.json())
                        .then(data => showDrinks(data.drinks));
                footer.style.marginTop = '320px';

        }
        else {
                // Load Drinks Item
                fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`)
                        .then(res => res.json())
                        .then(data => showDrinks(data.drinks));
                footer.style.marginTop = '320px';
        }
        searchField.value = '';
})

// Show Drinks Item:
function showDrinks(drinks) {
        if (!drinks) {
                const div = document.createElement('div');
                div.innerHTML = `
                        <h4 class="text-danger text-center">There are no drinks...</h4>
                `;
                errorMsg.appendChild(div);

        }

        else {
                drinks?.forEach(drink => {
                        const div = document.createElement('div');
                        div.innerHTML = `
                                <div onclick=singleDrink('${drink.idDrink}') class="col mx-auto">
                                        <div class="card drinks">
                                                <img src="${drink.strDrinkThumb}" class="img-fluid p-4 rounded-3" alt="...">
                                                <div class="card-body">
                                                        <h5 class="card-title">${drink.strDrink}</h5>
                                                        <p class="card-text"></p>
                                                </div>
                                        </div>
                                </div>
                                `;
                        drinksContainer.appendChild(div);
                })
                footer.style.marginTop = '0px';
        }
        loadSpinner('none');

}
// Load Single Drink By ID:
const singleDrink = (drink) => {
        loadSpinner('block');
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink}`)
                .then(res => res.json())
                .then(data => showSingleDrink(data.drinks[0]))
}

// Show Single Drink Details:
const showSingleDrink = (drink) => {
        console.log(drink);
        singleDrinkItem.textContent = '';
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card mx-auto mt-5 border border-success border-3" style="width: 20rem;">
                <img src="${drink.strDrinkThumb}" class="card-img-top p-1" alt="...">
                <div class="card-body">
                        <h5 class="card-title">${drink.strDrink}</h5>
                        <p class="card-text">${drink.strInstructions}</p>
                </div>
                <h5 class="text-center text-danger">Ingredients</h5>
                <ul class="list-group list-group-flush">
                        <li class="list-group-item">1. ${drink.strIngredient1}</li>
                        <li class="list-group-item">2. ${drink.strIngredient2}</li>
                        <li class="list-group-item">3. ${drink.strIngredient3}</li>
                        <li class="list-group-item">4. ${drink.strIngredient4}</li>
                </ul>
        </div>
        `;
        singleDrinkItem.appendChild(div);
        window.scrollTo(0, 40);
        loadSpinner('none');
}

const reload = () => {
        window.location.reload(true);
}
