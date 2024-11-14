import React, { useState, useEffect } from 'react';
import ImageCarousel from '../ImageCarrousel/ImageCarrousel';
import { convertUnixToDate, convertUnixToTime } from '../../utils/dateUtils'
import MultiSelect from '../ui/MultiSelect/MultiSelect';

function ProductItem({ product, onVerifyProduct }) {
    const [formOptions, setFormOptions] = useState({
        categoryOptions: [],
        subCategoryOptions: [],
        productTypeOptions: [],
        brandOptions: [],
        modelOptions: [],
        colorOptions: [],
        tagOptions: [],
        defectOptions: [],
        extrasOptions: [],
        specsOptions: [],
    });

    const [selectedOptions, setSelectedOptions] = useState([]);

    const [formData, setFormData] = useState({
        id: product.id,
        article_id: product.article_id,

        category_id: product.category.id,
        category_name: product.category.name,

        sub_category_id: product.sub_category.id == null ? '' : product.sub_category.id,
        sub_category_name: product.sub_category.name,

        brand_id: product.brand.id == null ? '' : product.brand.id,
        brand_name: product.brand.name,

        product_type_id: product.product_type.id == null ? '' : product.product_type.id,
        product_type_name: product.product_type.name,

        model_id: product.model.id == null ? '' : product.model.id,
        model_name: product.model.name,

        color_id: product.color.id == null ? '' : product.color.id,
        color_name: product.color.name == null ? '' : product.color.name,

        specs: product.specs == null ? '' : product.specs,
        extras: product.extras == null ? '' : product.extras,
        defects: product.defects == null ? '' : product.defects,
        tags: product.tags == null ? '' : product.tags,


        manual_confirmed: product.manual_confirmed,
        state: product.state == null ? '' : product.state,
        real_state: product.real_state,
        sub_sub_category_id: product.sub_sub_category_id,

        // Puedes añadir más campos aquí según tus necesidades.
    });

    let urls = JSON.parse(product.images);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const inputValue = type === 'checkbox' ? checked : value;

        const updateFormData = (updateFunc) => {
            setFormData(prevFormData => ({
                ...prevFormData,
                ...updateFunc(prevFormData),
            }));
        };

        const attributes = {
            'category_id': prevFormData => ({ [name]: inputValue, sub_category_id: '', brand_id: '', product_type_id: '', model_id: '', color_id: '', manual_confirmed: 'a medias' }),
            'sub_category_id': prevFormData => ({ [name]: inputValue, brand_id: '', product_type_id: '', model_id: '', color_id: '', manual_confirmed: 'a medias' }),
            'brand_id': prevFormData => ({ [name]: inputValue, product_type_id: '', model_id: '', manual_confirmed: 'a medias' }),
            'product_type_id': prevFormData => ({ [name]: inputValue, model_id: '', manual_confirmed: 'a medias' }),
            'model_id': prevFormData => ({ [name]: inputValue, manual_confirmed: 'a medias' }),
            'manual_confirmed': prevFormData => ({ [name]: inputValue }),
        };

        const defaultAttribute = prevFormData => ({ [name]: inputValue, manual_confirmed: 'a medias' })

        const attributeFunction = attributes[name] || defaultAttribute;
        updateFormData(attributeFunction);


    };

    const handleCheck = () => {

        const filteredData = { ...formData };

        // Convertir el array de objetos "tags" a un array de solo IDs utilizando una función anónima
        filteredData.tags = filteredData.tags.map(tag => tag.id);
        filteredData.specs = filteredData.specs.map(spec => spec.id);
        filteredData.defects = filteredData.defects.map(defect => defect.id);
        filteredData.extras = filteredData.extras.map(extra => extra.id);

        delete filteredData.category_name;
        delete filteredData.sub_category_name;
        delete filteredData.product_type_name;
        delete filteredData.model_name;
        delete filteredData.brand_name;
        delete filteredData.color_name;

        console.log(formData)

    }

    // Actualizar selectedOptions cuando formOptions.tagOptions cambie
    useEffect(() => {
        const initialSelectedOptions = formOptions.tagOptions.filter(option => formData.tags.includes(option.id));
        setSelectedOptions(initialSelectedOptions);
    }, [formOptions.tagOptions]);



    const handleClick = async (event) => {

        // console.log(formData.tags)

        // Escapa de la función si "disabled" es true 
        if (event.target.disabled) { return }


        const { name, value, type, checked } = event.target;
        const inputValue = type === 'checkbox' ? checked : value;

        // console.log(name)


        const attributes = {
            'category_id': {
                'url': `http://localhost:3000/api/data/categories`,
                'setStateFunction': data => setFormOptions({ ...formOptions, categoryOptions: data }),
            },
            'sub_category_id': {
                'url': `http://localhost:3000/api/data/sub_categories?category_id=${formData.category_id}`,
                'setStateFunction': data => setFormOptions({ ...formOptions, subCategoryOptions: data }),
            },
            'product_type_id': {
                'url': `http://localhost:3000/api/data/product_types?${formData.sub_category_id ? 'sub_category_id=' + formData.sub_category_id : ''}&${formData.brand_id ? 'brand_id=' + formData.brand_id : ''}`,
                'setStateFunction': data => setFormOptions({ ...formOptions, productTypeOptions: data })
            },
            'brand_id': {
                'url': `http://localhost:3000/api/data/brands?category_id=${formData.category_id}`,
                'setStateFunction': data => setFormOptions({ ...formOptions, brandOptions: data })
            },
            'model_id': {
                'url': `http://localhost:3000/api/data/models?product_type_id=${formData.product_type_id}`,
                'setStateFunction': data => setFormOptions({ ...formOptions, modelOptions: data })
            },
            'color_id': {
                'url': `http://localhost:3000/api/data/colors?sub_category_id=${formData.sub_category_id}`,
                'setStateFunction': data => setFormOptions({ ...formOptions, colorOptions: data })
            },
            'tags': {
                'url': `http://localhost:3000/api/data/tags?sub_category_id=${formData.sub_category_id}`,
                'setStateFunction': data => setFormOptions({ ...formOptions, tagOptions: data })
            },
            'specs': {
                'url': `http://localhost:3000/api/data/specs?sub_category_id=${formData.sub_category_id}`,
                'setStateFunction': data => setFormOptions({ ...formOptions, specsOptions: data })
            },
            'defects': {
                'url': `http://localhost:3000/api/data/defects?sub_category_id=${formData.sub_category_id}`,
                'setStateFunction': data => setFormOptions({ ...formOptions, defectOptions: data })
            },
            'extras': {
                'url': `http://localhost:3000/api/data/extras?sub_category_id=${formData.sub_category_id}`,
                'setStateFunction': data => setFormOptions({ ...formOptions, extrasOptions: data })
            },
        };

        const defaultAttribute = {
            'url': ``,
            'setStateFunction': () => setFormOptions({ ...formOptions })
        }

        const attribute = attributes[name] || defaultAttribute;
        const url = attribute.url;
        const setStateFunction = attribute.setStateFunction;

        if (attribute !== defaultAttribute) {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setStateFunction(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

    };
    const handleGuardar = () => {

        // setFormData((prevFormData) => ({
        //     ...prevFormData,
        //     manual_confirmed: 'chequeado',
        // }));

        // console.log('Objeto con cambios:', formData);
        // onVerifyProduct(formData);

        const filteredData = { ...formData };

        // Convertir el array de objetos "tags" a un array de solo IDs utilizando una función anónima
        filteredData.tags = filteredData.tags.map(tag => tag.id);
        filteredData.specs = filteredData.specs.map(spec => spec.id);
        filteredData.defects = filteredData.defects.map(defect => defect.id);
        filteredData.extras = filteredData.extras.map(extra => extra.id);

        delete filteredData.category_name;
        delete filteredData.sub_category_name;
        delete filteredData.product_type_name;
        delete filteredData.model_name;
        delete filteredData.brand_name;
        delete filteredData.color_name;


        console.log(filteredData)

        onVerifyProduct(filteredData);
        // Aquí puedes realizar alguna acción con el objeto formData, como enviarlo a un servidor, etc.
    };

    const handleSetData = () => {





        const updateFormData = (updateFunc) => {
            setFormData(prevFormData => ({
                ...prevFormData,
                ...updateFunc(prevFormData),
            }));
        };


        updateFormData(prevFormData => ({
            category_id: 12900, // moviles
            sub_category_id: "44", // moviles
            brand_id: 21, //apple
            product_type_id: 16, //iphone
            // model_id: 13, // 14 pro max
            color_id: '', //''
            // specs: [{ id: 5, name: '32gb' }], //''
            manual_confirmed: 'a medias'
        }));


    }



    // Colores de background según el estado de "product.manual_confirmed"
    const stateColors = {
        'chequeado': '#D9F2EC',
        'sin chequear': '#F5F5F5',
        'ambiguo': '#F5E7DA',
        'a medias': '#F0F9CE',
        'irrelevante': '#D9D9D9',
        'ninguno': 'color_para_ninguno',
        'des reservado': '#EBFFFE',
        'mucho tiempo reservado': '#CBECFF',
        'borrado': '#F9D6CE',
    };

    const options = ["Manzana", "Banana", "Naranja", "Uva"];


    function copiarTexto() {
        const texto = product.title;
        navigator.clipboard.writeText(texto)

    }


    return (
        <tr style={{ backgroundColor: stateColors[product.manual_confirmed], opacity: product.manual_confirmed == 'irrelevante' ? '50%' : '100%', padding: '1rem', margin: '1000px', borderBottom: '1px solid #ccc' }}>
            {/* CARROUSEL */}
            <td>

                <div style={{ width: '200px', height: '200px', position: 'relative' }}>

                    <ImageCarousel imageUrls={urls} />
                    <div style={{ position: 'absolute', left: '0.5rem', top: '0.5rem', display: product.article_status == null ? 'none' : 'initial' }}>
                        <div style={{ backgroundColor: '#fff', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 1px 4px 0px', borderRadius: '20px', height: '38px', width: '38px', position: 'relative' }}>

                            {/* SVG para el reservado */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#385ef9" viewBox="0 0 24 24" style={{ position: 'absolute', right: '11px', top: '11px', display: product.article_status == 'reservado' ? 'initial' : 'none' }}>
                                <g clip-path="url(#a)">
                                    <path fill-rule="evenodd" d="M5.087 1.928c-.471.331-.744.793-.759 1.28L3.75 21.732c-.01.311.175.57.49.699a.881.881 0 0 0 .952-.167l5.722-5.397-.604-.571a.75.75 0 0 1 1.032-1.09l4.742 4.489 2.724 2.57a.881.881 0 0 0 .952.166c.315-.129.5-.388.49-.7L19.672 3.21c-.015-.488-.288-.95-.76-1.281a2.363 2.363 0 0 0-1.7-.401A33.66 33.66 0 0 1 12 1.92c-2.074 0-3.836-.178-5.213-.394a2.363 2.363 0 0 0-1.7.4ZM17.78 23.354c.747.705 1.754.788 2.546.465.795-.323 1.456-1.094 1.424-2.135l-.58-18.522c-.032-1.05-.618-1.914-1.395-2.461A3.863 3.863 0 0 0 16.98.045 32.158 32.158 0 0 1 12 .421c-1.988 0-3.672-.17-4.98-.376a3.863 3.863 0 0 0-2.796.656c-.777.547-1.363 1.412-1.395 2.461L2.25 21.684c-.032 1.041.629 1.811 1.424 2.135.792.323 1.8.24 2.546-.465l5.733-5.407a.07.07 0 0 1 .046-.014c.025 0 .04.009.046.014l5.733 5.407Z" clip-rule="evenodd"></path>
                                </g>

                            </svg>

                            {/* SVG para el vendido */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ce3528" viewBox="0 0 24 24" style={{ position: 'absolute', right: '11px', top: '11px', display: product.article_status == 'vendido' ? 'initial' : 'none' }}>
                                <g clip-path="url(#a)">
                                    <path fill-rule="evenodd"
                                        d="M14.672.1c1.192-.26 2.549-.038 3.628 1.04l4.213 4.21a4.985 4.985 0 0 1 .49 6.482l.26.258a2.514 2.514 0 0 1-.876 4.127 2.514 2.514 0 0 1-.123 3.425 2.518 2.518 0 0 1-2.88.484 2.518 2.518 0 0 1-4.045 1.136 2.487 2.487 0 0 1-.57.875l-.25.25a2.165 2.165 0 0 1-2.45.428 2.23 2.23 0 0 1-.083.088l-.437.44c-.845.847-2.229.893-3.09.035a2.117 2.117 0 0 1-.556-.962c-.776.11-1.61-.196-2.188-.773a2.767 2.767 0 0 1-.72-1.25c-.798.148-1.668-.14-2.273-.743-.627-.625-.918-1.537-.734-2.358A2.66 2.66 0 0 1 .776 16.6c-.933-.93-1.087-2.473-.123-3.441l.824-.828a4.986 4.986 0 0 1 .489-6.487L5.96 1.853a4.994 4.994 0 0 1 6.435-.528A4.753 4.753 0 0 1 14.672.099Zm-3.154 2.44a3.493 3.493 0 0 0-4.497.373L3.026 6.906a3.486 3.486 0 0 0-.361 4.509c.89-.341 1.95-.086 2.66.62.363.363.609.819.716 1.297.785-.128 1.633.161 2.226.752.607.605.9 1.48.75 2.28.462.12.9.369 1.246.714.578.577.887 1.408.78 2.184a2.128 2.128 0 0 1 1.594 2.157c.257.16.6.13.822-.093l.25-.25a1.014 1.014 0 0 0 0-1.434l-1.75-1.75a.75.75 0 1 1 1.06-1.06l3.25 3.246a1.014 1.014 0 1 0 1.439-1.434l-2.75-2.748-.002-.001-.499-.498a.75.75 0 0 1 1.06-1.061l4.249 4.245c.397.396 1.04.396 1.437 0a1.014 1.014 0 0 0 0-1.436L16.955 12.9a.75.75 0 0 1 1.06-1.06l.5.498 2.25 2.248c.396.397 1.04.397 1.437 0a1.014 1.014 0 0 0 0-1.435l-4.841-4.838c-.51.205-1.084.243-1.542.22a4.416 4.416 0 0 1-1.008-.168 3.136 3.136 0 0 1-.219-.073l-1.388 2.402a2.822 2.822 0 1 1-4.862-2.862l3.176-5.291Zm3.843 4.419a3.078 3.078 0 0 0 1.134.044.75.75 0 0 1 1.27-.407l.245.244a.457.457 0 0 1 .01.01l3.905 3.903a3.485 3.485 0 0 0-.473-4.343L17.24 2.2c-.66-.661-1.47-.806-2.247-.636-.8.174-1.507.674-1.87 1.218L9.628 8.604a1.322 1.322 0 1 0 2.278 1.34l2.147-3.719a.75.75 0 0 1 1.308.735ZM9.466 21.442l.61-.611a.68.68 0 0 1 .877.047c.244.243.261.675-.029.966l-.438.44c-.29.29-.724.275-.968.031a.677.677 0 0 1-.052-.873Zm-.393-1.73.32-.32c.216-.218.292-.772-.189-1.251-.447-.446-.957-.41-1.2-.228L6.54 19.38c-.18.244-.215.754.232 1.2.482.479 1.035.4 1.251.183l.319-.319a2.26 2.26 0 0 1 .14-.155l.439-.44c.048-.048.099-.095.151-.138ZM7 16.796l.361-.363c.252-.252.311-.825-.152-1.287-.463-.461-1.035-.4-1.287-.147l-.398.4a2.405 2.405 0 0 1-.075.078l-1.23 1.235-.079.075-.51.513c-.253.253-.312.825.151 1.287.464.462 1.036.4 1.288.148l.353-.355c.032-.037.066-.073.101-.109l1.368-1.373c.036-.035.072-.07.109-.102Zm-2.575-2.42c.248-.298.269-.852-.158-1.278-.448-.446-1.036-.4-1.32-.115l-1.23 1.236c-.284.284-.329.873.12 1.32.426.425.98.402 1.277.153l1.31-1.316Z" clip-rule="evenodd">
                                    </path>
                                </g>
                            </svg>

                            {/* SVG para el des-reservado */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#777" viewBox="0 0 24 24" style={{ position: 'absolute', right: '11px', top: '11px', display: product.article_status == 'des-reservado' ? 'initial' : 'none' }}>
                                <g clip-path="url(#a)">
                                    <path fill-rule="evenodd"
                                        d="M5.087 1.928c-.471.331-.744.793-.759 1.28L3.75 21.732c-.01.311.175.57.49.699a.881.881 0 0 0 .952-.167l5.722-5.397-.604-.571a.75.75 0 0 1 1.032-1.09l4.742 4.489 2.724 2.57a.881.881 0 0 0 .952.166c.315-.129.5-.388.49-.7L19.672 3.21c-.015-.488-.288-.95-.76-1.281a2.363 2.363 0 0 0-1.7-.401A33.66 33.66 0 0 1 12 1.92c-2.074 0-3.836-.178-5.213-.394a2.363 2.363 0 0 0-1.7.4ZM17.78 23.354c.747.705 1.754.788 2.546.465.795-.323 1.456-1.094 1.424-2.135l-.58-18.522c-.032-1.05-.618-1.914-1.395-2.461A3.863 3.863 0 0 0 16.98.045 32.158 32.158 0 0 1 12 .421c-1.988 0-3.672-.17-4.98-.376a3.863 3.863 0 0 0-2.796.656c-.777.547-1.363 1.412-1.395 2.461L2.25 21.684c-.032 1.041.629 1.811 1.424 2.135.792.323 1.8.24 2.546-.465l5.733-5.407a.07.07 0 0 1 .046-.014c.025 0 .04.009.046.014l5.733 5.407Z" clip-rule="evenodd">
                                    </path>
                                    <line x1="24" y1="0" x2="0" y2="24" stroke="#777" stroke-width="2" />
                                </g>
                            </svg>

                            {/* SVG para el borrado */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#777" viewBox="0 0 24 24" style={{ position: 'absolute', right: '11px', top: '11px', display: product.article_status == 'borrado' ? 'initial' : 'none' }}>
                                <g clip-path="url(#a)">
                                    <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>


                                    {/* <line x1="24" y1="0" x2="0" y2="24" stroke="#777" stroke-width="2" /> */}
                                </g>
                            </svg>


                        </div>
                    </div>



                    <div style={{ position: 'absolute', right: '0.5rem', top: '0.5rem', display: product.allows_shipping == 1 ? 'initial' : 'none' }}>
                        <div style={{ backgroundColor: '#fff', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 1px 4px 0px', borderRadius: '20px', height: '38px', width: '38px', position: 'relative' }}>

                            {/* SVG para el reservado */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#385ef9" viewBox="0 0 39 39" style={{ position: 'absolute', right: '3px', top: '4px' }}>
                                <g clip-path="url(#a)">
                                    <path d="M11.0973 11H20.6534C20.9444 11 21.2236 11.1156 21.4293 11.3214C21.6351 11.5271 21.7507 11.8063 21.7507 12.0973L21.7609 12.5574H25.4967C25.9 12.557 26.2756 12.7628 26.4923 13.103L29.7007 18.1479C29.8968 18.4571 30.0007 18.8159 29.9999 19.182V24.068C30.0028 24.3596 29.8888 24.64 29.6833 24.8469C29.4779 25.0538 29.1983 25.1699 28.9068 25.1694H27.5489C27.3675 25.7808 26.9935 26.3173 26.4825 26.6989C25.9714 27.0804 25.3507 27.2866 24.7129 27.2866C24.0738 27.2923 23.4504 27.0883 22.9381 26.7058C22.426 26.3235 22.0533 25.7838 21.877 25.1694H18.3305C18.1493 25.7807 17.7752 26.3173 17.2641 26.6988C16.753 27.0804 16.1325 27.2866 15.4946 27.2866C14.8555 27.2923 14.2321 27.0882 13.7199 26.7058C13.2077 26.3235 12.8349 25.7837 12.6587 25.1694H11.0932C10.8031 25.1698 10.5247 25.0549 10.3195 24.8497C10.1145 24.6445 9.99943 24.3662 10 24.076V12.089C10.0021 11.7993 10.1186 11.5223 10.3242 11.3183C10.5297 11.1142 10.8076 11 11.0973 11ZM24.7131 25.5704C25.0349 25.5636 25.3417 25.4328 25.5692 25.2052C25.7969 24.9775 25.9278 24.6708 25.9345 24.3489C25.9345 24.0249 25.8058 23.7142 25.5768 23.4852C25.3477 23.2561 25.037 23.1274 24.7131 23.1274C24.3911 23.1341 24.0844 23.265 23.8568 23.4927C23.6291 23.7202 23.4983 24.0271 23.4915 24.3489C23.4942 24.6721 23.6237 24.9812 23.8522 25.2097C24.0807 25.4382 24.3898 25.5677 24.7131 25.5704ZM22.7952 18.1803C22.7952 18.3299 22.9165 18.4511 23.066 18.4511H27.394C27.49 18.449 27.5776 18.3963 27.6245 18.3127C27.6714 18.229 27.6704 18.1268 27.6221 18.044L25.3501 14.4609C25.3007 14.3826 25.2146 14.335 25.122 14.3346H23.0639C22.9144 14.3346 22.7931 14.4559 22.7931 14.6054L22.7952 18.1803ZM15.4946 25.5621C15.931 25.5621 16.3343 25.3293 16.5526 24.9514C16.7707 24.5734 16.7707 24.1078 16.5526 23.7299C16.3343 23.352 15.931 23.1191 15.4946 23.1191C15.1722 23.1239 14.8642 23.254 14.6361 23.482C14.4081 23.7101 14.2778 24.0181 14.2732 24.3406C14.2732 24.6645 14.4018 24.9753 14.6309 25.2043C14.8599 25.4334 15.1707 25.5621 15.4946 25.5621Z" fill="#253238"></path>                                </g>
                            </svg>
                        </div>
                    </div>

                </div>
                {/* <div>
                    <button onClick={handleCheck}>preview antes de enviar</button><br />
                </div>
                <button onClick={handleSetData}>Establecer valores personalizados</button>

                {formData.article_id} */}

            </td>


            {/* INPUTS */}
            <td style={{ margin: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', margin: '1rem 0' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <a href={product.article_url} target="blank" title={product.description}>{product.title}</a>
                            <a href={'https://es.wallapop.com/app/chat?itemId=' + formData.article_id} target='blank' style={{ margin: '0rem 0.5rem' }}>
                                <div style={{ backgroundColor: '#fff', width: '38px', height: '38px', borderRadius: '20px', position: 'relative' }}>
                                    <svg width="32px" height="32px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39 39" style={{ position: 'absolute', top: '9px', left: '9px' }}>
                                        <path d="M7.29117 20.8242L2 22L3.17581 16.7088C2.42544 15.3056 2 13.7025 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.2975 22 8.6944 21.5746 7.29117 20.8242ZM7.58075 18.711L8.23428 19.0605C9.38248 19.6745 10.6655 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 13.3345 4.32549 14.6175 4.93949 15.7657L5.28896 16.4192L4.63416 19.3658L7.58075 18.711Z"></path>
                                    </svg>

                                </div>

                            </a>

                            {/* <button onClick={copiarTexto}>Copiar</button> */}

                        </div>
                        <span>{product.description}</span>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div>
                            <label htmlFor="selectCategory">category:</label><br />
                            <select id="selectCategory" onChange={handleChange} onClick={handleClick} value={formData.category_id} name='category_id' autocomplete="off">
                                <option value="" hidden>{formData.category_name}</option>
                                {formOptions.categoryOptions.map(option => (
                                    <option
                                        key={option.id}
                                        value={option.id}
                                        // disabled={option.id === formData.category_id}
                                        selected={option.id === formData.category_id}
                                        style={option.id === formData.category_id ? { backgroundColor: '#1967D2', color: 'white' } : {}}
                                    >
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="">sub_category:</label><br />
                            <select onChange={handleChange} onClick={handleClick} value={formData.sub_category_id} name='sub_category_id' autocomplete="off">
                                <option hidden>{formData.sub_category_name}</option>
                                <option value="">ninguno</option>
                                {formOptions.subCategoryOptions.map(option => (
                                    <option key={option.id} value={option.id} selected={option.id === formData.sub_category_id ? true : false}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="">brand:</label><br />
                            <select onChange={handleChange} onClick={handleClick} value={formData.brand_id} name='brand_id' >
                                <option hidden>{formData.brand_name}</option>
                                <option value="">ninguno</option>
                                {formOptions.brandOptions.map(option => (
                                    <option key={option.id} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="">product_type:</label><br />
                            <select onChange={handleChange} onClick={handleClick} value={formData.product_type_id} name='product_type_id' disabled={formData.sub_category_id == '' && formData.brand_id == ''}>
                                <option hidden>{formData.product_type_name}</option>
                                <option value="">ninguno</option>
                                {formOptions.productTypeOptions.map(option => (
                                    <option key={option.id} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="">model:</label><br />
                            <select onChange={handleChange} onClick={handleClick} value={formData.model_id} name='model_id' disabled={formData.product_type_id == ''}>
                                <option hidden>{formData.model_name}</option>
                                <option value="">ninguno</option>
                                {formOptions.modelOptions.map(option => (
                                    <option key={option.id} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="">color:</label><br />
                            <select onChange={handleChange} onClick={handleClick} value={formData.color_id} name='color_id' disabled={formData.sub_category_id == ''}>
                                <option hidden>{formData.color_name}</option>
                                <option value="">ninguno</option>
                                {formOptions.colorOptions.map(option => (
                                    <option key={option.id} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <MultiSelect
                                onClick={handleClick}
                                options={formOptions.tagOptions}
                                disabled={formData.sub_category_id == ''}
                                name='tags'
                                formData={formData}
                                setFormData={setFormData}
                                values={formData.tags}
                            />



                            <MultiSelect
                                onClick={handleClick}
                                options={formOptions.specsOptions}
                                disabled={formData.sub_category_id == ''}
                                name='specs'
                                formData={formData}
                                setFormData={setFormData}
                                values={formData.specs}

                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <MultiSelect onClick={handleClick}
                                options={formOptions.defectOptions}
                                disabled={formData.sub_category_id == ''}
                                name='defects'
                                formData={formData}
                                setFormData={setFormData}
                                values={formData.defects}

                            />

                            <MultiSelect onClick={handleClick}
                                options={formOptions.extrasOptions}
                                disabled={formData.sub_category_id == ''}
                                name='extras'
                                formData={formData}
                                setFormData={setFormData}
                                values={formData.extras}

                            />
                        </div>




                    </div>


                    <div style={{ display: 'flex' }}>
                        <div>
                            <label htmlFor="">state</label><br />
                            <select name="state" value={formData.state} onChange={handleChange} >
                                <option value="null">ninguno</option>
                                <option value="sin abrir">sin abrir</option>
                                <option value="nuevo">nuevo</option>
                                <option value="como nuevo">como nuevo</option>
                                <option value="en buen estado">en buen estado</option>
                                <option value="en condiciones aceptables">en condiciones aceptables</option>
                                <option value="lo ha dado todo">lo ha dado todo</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="">real_state</label><br />
                            <select name="real_state" value={formData.real_state} onChange={handleChange} >
                                <option value="null">ninguno</option>
                                <option value="precintado">precintado</option>
                                <option value="desprecintado">desprecintado</option>
                                <option value="bien cuidado">bien cuidado</option>
                                <option value="con marcas de uso">con marcas de uso</option>
                                <option value="con defectos">con defectos</option>
                                <option value="para reaparar">para reaparar</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="">manual_confirmed:</label><br />
                            <select name="manual_confirmed" value={formData.manual_confirmed} onChange={handleChange} >
                                <option value="chequeado">chequeado</option>
                                <option value="a medias">a medias</option>
                                <option value="sin chequear">sin chequear</option>
                                <option value="ambiguo">ambiguo</option>
                                <option value="irrelevante">irrelevante</option>
                                <option value="des reservado">des reservado</option>
                                <option value="mucho tiempo resercado">mucho tiempo resercado</option>
                                <option value="borrado">borrado</option>

                            </select>
                        </div>



                    </div>
                    <div style={{ display: 'flex', marginBottom: '1rem', justifyContent: 'space-between' }}>
                        <div>
                            <div>w_brand: {product.w_brand}</div>
                            <div>w_model: {product.w_model}</div>
                        </div>
                        <div>
                            <div>w_sub_category: {product.w_sub_category}</div>
                            <div>w_sub_sub_category: {product.w_sub_sub_category}</div>

                        </div>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path></svg>
                                {product.views}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z"></path></svg>
                                {product.favorites}
                            </div>
                        </div>

                        {/* <div>favorites: {product.favorites}</div> */}
                    </div>

                    <button onClick={handleGuardar}>Guardar cambios</button>

                </div>


            </td>


            {/* PRECIO */}
            <td>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <b>{product.price + '€'}</b>

                </div>

            </td>

            {/* FECHAS */}
            <td>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span>Fecha vendido:</span>
                    {convertUnixToDate(product.reserved_date)}
                    <br />
                    <br />
                    <span>Tiempo en reservarse:</span>
                    <b>{convertUnixToTime(product.time_to_sell)}</b> <br />
                    <br />
                    <br />
                    <div style={{ display: product.sale_date ? 'initial' : 'none' }}>
                        <span>Tiempo en venderse:</span><br />
                        <b>{convertUnixToTime(product.sale_date - product.reserved_date)}</b> <br />

                    </div>


                    {/* <br />
                    <span>Fecha Publicado:</span>
                    <b>{convertUnixToDate(product.creation_date)}</b> */}
                </div>
            </td>

            {/* UBICACIÓN */}
            <td>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* <span>código postal:</span> */}
                    {product.postal_code}
                    {/* <br />
                    <br />
                    <span>Tiempo en llegar al sitio:</span>
                    {'xxx'} */}
                </div>
            </td>
            {/* <a href={product.article_url} target="blank">{product.title}</a> - {product.price} */}
        </tr >
    );
}

export default ProductItem;