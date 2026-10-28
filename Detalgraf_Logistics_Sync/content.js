// DETECTOR EN TIEMPO REAL DE CAMBIOS DE STATUS SHOPIFY -> GOOGLE SHEETS
const HISTORICAL_META = {"2500": {"fecha": "2026-01-23", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2500"}, "2501": {"fecha": "2026-01-24", "destino": "Bogotá, Bogotá, D.C.", "guia": "DTL-2026-2501"}, "2502": {"fecha": "2026-01-25", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2502"}, "2503": {"fecha": "2026-01-27", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2503"}, "2504": {"fecha": "2026-02-02", "destino": "Cota, Cundinamarca", "guia": "DTL-2026-2504"}, "2505": {"fecha": "2026-02-04", "destino": "bogota, Bogotá, D.C.", "guia": "DTL-2026-2505"}, "2506": {"fecha": "2026-02-04", "destino": "Cartagena, Bolívar", "guia": "DTL-2026-2506"}, "2507": {"fecha": "2026-02-05", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2507"}, "2508": {"fecha": "2026-02-06", "destino": "Bogotá, Bogotá, D.C.", "guia": "DTL-2026-2508"}, "2509": {"fecha": "2026-02-07", "destino": "MOSQUERA, Bogotá, D.C.", "guia": "DTL-2026-2509"}, "2510": {"fecha": "2026-02-10", "destino": "Bogotá, Bogotá, D.C.", "guia": "DTL-2026-2510"}, "2511": {"fecha": "2026-02-12", "destino": "BOGOTA, Cundinamarca", "guia": "DTL-2026-2511"}, "2512": {"fecha": "2026-02-17", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2512"}, "2513": {"fecha": "2026-02-18", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2513"}, "2514": {"fecha": "2026-02-18", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2514"}, "2515": {"fecha": "2026-02-19", "destino": "Bogotá, D.C., Bogotá, D.C.", "guia": "DTL-2026-2515"}, "2516": {"fecha": "2026-02-19", "destino": "bogota, Bogotá, D.C.", "guia": "DTL-2026-2516"}, "2517": {"fecha": "2026-02-23", "destino": "FUNZA, Cundinamarca", "guia": "DTL-2026-2517"}, "2518": {"fecha": "2026-02-25", "destino": "bogota, Bogotá, D.C.", "guia": "DTL-2026-2518"}, "2519": {"fecha": "2026-02-26", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2519"}, "2520": {"fecha": "2026-02-26", "destino": "Bogotá, Bogotá, D.C.", "guia": "DTL-2026-2520"}, "2521": {"fecha": "2026-02-27", "destino": "NEIVA, Huila", "guia": "DTL-2026-2521"}, "2522": {"fecha": "2026-02-27", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2522"}, "2523": {"fecha": "2026-03-02", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2523"}, "2524": {"fecha": "2026-03-03", "destino": "Cota, Cundinamarca", "guia": "DTL-2026-2524"}, "2525": {"fecha": "2026-03-04", "destino": "Bogotá, Bogotá, D.C.", "guia": "DTL-2026-2525"}, "2526": {"fecha": "2026-03-04", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2526"}, "2527": {"fecha": "2026-03-06", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2527"}, "2528": {"fecha": "2026-03-09", "destino": "ARMENIA, Quindío", "guia": "DTL-2026-2528"}, "2529": {"fecha": "2026-03-09", "destino": "Soacha, Cundinamarca", "guia": "DTL-2026-2529"}, "2530": {"fecha": "2026-03-11", "destino": "Cota, Cundinamarca", "guia": "DTL-2026-2530"}, "2531": {"fecha": "2026-03-12", "destino": "Medellin, Antioquia", "guia": "DTL-2026-2531"}, "2532": {"fecha": "2026-03-12", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2532"}, "2533": {"fecha": "2026-03-13", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2533"}, "2534": {"fecha": "2026-03-16", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2534"}, "2535": {"fecha": "2026-03-18", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2535"}, "2536": {"fecha": "2026-03-19", "destino": "Bogotá, Bogotá, D.C.", "guia": "DTL-2026-2536"}, "2537": {"fecha": "2026-03-20", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2537"}, "2538": {"fecha": "2026-03-20", "destino": "BOGOTÁ D.C., Bogotá, D.C.", "guia": "DTL-2026-2538"}, "2539": {"fecha": "2026-03-20", "destino": "MEDELLÍN, Antioquia", "guia": "DTL-2026-2539"}, "2540": {"fecha": "2026-03-22", "destino": "BOGOTÁ, D.C., Bogotá, D.C.", "guia": "DTL-2026-2540"}, "2541": {"fecha": "2026-03-22", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2541"}, "2542": {"fecha": "2026-03-24", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2542"}, "2543": {"fecha": "2026-03-25", "destino": "Bogotá, Bogotá, D.C.", "guia": "DTL-2026-2543"}, "2544": {"fecha": "2026-03-25", "destino": "bogota, Bogotá, D.C.", "guia": "DTL-2026-2544"}, "2545": {"fecha": "2026-03-25", "destino": "Bogotá, Bogotá, D.C.", "guia": "DTL-2026-2545"}, "2546": {"fecha": "2026-03-25", "destino": "Bogotá D.C.", "guia": "DTL-2026-2546"}, "2547": {"fecha": "2026-03-26", "destino": "Funza, Cundinamarca", "guia": "DTL-2026-2547"}, "2548": {"fecha": "2026-03-26", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2548"}, "2549": {"fecha": "2026-03-27", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2549"}, "2550": {"fecha": "2026-03-27", "destino": "Bogotá, Bogotá, D.C.", "guia": "DTL-2026-2550"}, "2551": {"fecha": "2026-03-28", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2551"}, "2552": {"fecha": "2026-03-30", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2552"}, "2553": {"fecha": "2026-03-30", "destino": "Bogotá, Bogotá, D.C.", "guia": "DTL-2026-2553"}, "2554": {"fecha": "2026-04-06", "destino": "CAJICA, Cundinamarca", "guia": "DTL-2026-2554"}, "2555": {"fecha": "2026-04-07", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2555"}, "2556": {"fecha": "2026-04-07", "destino": "Cota, Bogotá, D.C.", "guia": "DTL-2026-2556"}, "2557": {"fecha": "2026-04-07", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2557"}, "2558": {"fecha": "2026-04-07", "destino": "Bogotá, Bogotá, D.C.", "guia": "DTL-2026-2558"}, "2559": {"fecha": "2026-04-08", "destino": "Bogotá, Bogotá, D.C.", "guia": "DTL-2026-2559"}, "2560": {"fecha": "2026-04-08", "destino": "bogota, Bogotá, D.C.", "guia": "DTL-2026-2560"}, "2561": {"fecha": "2026-04-08", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2561"}, "2562": {"fecha": "2026-04-09", "destino": "FUNZA, Cundinamarca", "guia": "DTL-2026-2562"}, "2563": {"fecha": "2026-04-13", "destino": "Bogota DC, Bogotá, D.C.", "guia": "DTL-2026-2563"}, "2564": {"fecha": "2026-04-15", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2564"}, "2565": {"fecha": "2026-04-17", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2565"}, "2566": {"fecha": "2026-04-20", "destino": "Cota, Cundinamarca", "guia": "DTL-2026-2566"}, "2567": {"fecha": "2026-04-20", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2567"}, "2568": {"fecha": "2026-04-20", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2568"}, "2569": {"fecha": "2026-04-22", "destino": "Bogotá, Bogotá, D.C.", "guia": "DTL-2026-2569"}, "2570": {"fecha": "2026-04-23", "destino": "BOGOTA D.C., Cundinamarca", "guia": "DTL-2026-2570"}, "2571": {"fecha": "2026-04-27", "destino": "15, Bogotá, D.C.", "guia": "DTL-2026-2571"}, "2572": {"fecha": "2026-04-28", "destino": "Bogotá, Bogotá, D.C.", "guia": "DTL-2026-2572"}, "2573": {"fecha": "2026-04-28", "destino": "BOGOTÁ, D.C., Bogotá, D.C.", "guia": "DTL-2026-2573"}, "2574": {"fecha": "2026-05-07", "destino": "Bogotá, Bogotá, D.C.", "guia": "DTL-2026-2574"}, "2575": {"fecha": "2026-05-08", "destino": "Funza, Cundinamarca", "guia": "DTL-2026-2575"}, "2576": {"fecha": "2026-05-08", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2576"}, "2577": {"fecha": "2026-05-10", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2577"}, "2578": {"fecha": "2026-05-11", "destino": "Bogotá, Bogotá, D.C.", "guia": "DTL-2026-2578"}, "2579": {"fecha": "2026-05-11", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2579"}, "2580": {"fecha": "2026-05-11", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2580"}, "2581": {"fecha": "2026-05-13", "destino": "bogota, Bogotá, D.C.", "guia": "DTL-2026-2581"}, "2582": {"fecha": "2026-05-14", "destino": "Bogotá, D.C., Bogotá, D.C.", "guia": "DTL-2026-2582"}, "2583": {"fecha": "2026-05-14", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2583"}, "2584": {"fecha": "2026-05-14", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2584"}, "2585": {"fecha": "2026-05-14", "destino": "Bogotá, Bogotá, D.C.", "guia": "DTL-2026-2585"}, "2586": {"fecha": "2026-05-15", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2586"}, "2587": {"fecha": "2026-05-19", "destino": "Cota, Cundinamarca", "guia": "DTL-2026-2587"}, "2588": {"fecha": "2026-05-20", "destino": "Funza, Cundinamarca", "guia": "DTL-2026-2588"}, "2589": {"fecha": "2026-05-21", "destino": "Bogotá, Bogotá, D.C.", "guia": "DTL-2026-2589"}, "2590": {"fecha": "2026-05-21", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2590"}, "2591": {"fecha": "2026-05-22", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2591"}, "2592": {"fecha": "2026-05-25", "destino": "FUNZA, Cundinamarca", "guia": "DTL-2026-2592"}, "2593": {"fecha": "2026-05-25", "destino": "bogota, Bogotá, D.C.", "guia": "DTL-2026-2593"}, "2594": {"fecha": "2026-05-26", "destino": "VILLAVICENCIO, Meta", "guia": "DTL-2026-2594"}, "2595": {"fecha": "2026-05-26", "destino": "BOGOTÁ, D.C., Bogotá, D.C.", "guia": "DTL-2026-2595"}, "2596": {"fecha": "2026-05-27", "destino": "bogota, Bogotá, D.C.", "guia": "DTL-2026-2596"}, "2597": {"fecha": "2026-05-27", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2597"}, "2598": {"fecha": "2026-05-27", "destino": "Cota, Cundinamarca", "guia": "DTL-2026-2598"}, "2599": {"fecha": "2026-05-27", "destino": "Bogotá, Bogotá, D.C.", "guia": "DTL-2026-2599"}, "2600": {"fecha": "2026-05-28", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2600"}, "2601": {"fecha": "2026-05-29", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2601"}, "2602": {"fecha": "2026-06-01", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2602"}, "2603": {"fecha": "2026-06-02", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2603"}, "2604": {"fecha": "2026-06-02", "destino": "Funza, Cundinamarca", "guia": "DTL-2026-2604"}, "2605": {"fecha": "2026-06-02", "destino": "Bogotá, Bogotá, D.C.", "guia": "DTL-2026-2605"}, "2606": {"fecha": "2026-06-03", "destino": "Bogotá, Cundinamarca", "guia": "DTL-2026-2606"}, "2607": {"fecha": "2026-06-03", "destino": "FUNZA, Bogotá, D.C.", "guia": "DTL-2026-2607"}, "2608": {"fecha": "2026-06-04", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2608"}, "2609": {"fecha": "2026-06-05", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2609"}, "2610": {"fecha": "2026-06-05", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2610"}, "2611": {"fecha": "2026-06-07", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2611"}, "2612": {"fecha": "2026-06-09", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2612"}, "2613": {"fecha": "2026-06-09", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2613"}, "2614": {"fecha": "2026-06-10", "destino": "Bogotá, Bogotá, D.C.", "guia": "DTL-2026-2614"}, "2615": {"fecha": "2026-06-10", "destino": "Barranquilla, Atlántico", "guia": "DTL-2026-2615"}, "2616": {"fecha": "2026-06-17", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2616"}, "2617": {"fecha": "2026-06-17", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2617"}, "2618": {"fecha": "2026-06-17", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2618"}, "2619": {"fecha": "2026-06-18", "destino": "Cartagena, Bolívar", "guia": "DTL-2026-2619"}, "2620": {"fecha": "2026-06-18", "destino": "BOGOTA D.C., Cundinamarca", "guia": "DTL-2026-2620"}, "2621": {"fecha": "2026-06-19", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2621"}, "2622": {"fecha": "2026-06-22", "destino": "bogota, Bogotá, D.C.", "guia": "DTL-2026-2622"}, "2623": {"fecha": "2026-06-24", "destino": "Cota, Cundinamarca", "guia": "DTL-2026-2623"}, "2624": {"fecha": "2026-06-24", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2624"}, "2625": {"fecha": "2026-06-26", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2625"}, "2626": {"fecha": "2026-06-26", "destino": "Bogotá, Bogotá, D.C.", "guia": "DTL-2026-2626"}, "2627": {"fecha": "2026-06-30", "destino": "Bogotá, D.C., Bogotá, D.C.", "guia": "DTL-2026-2627"}, "2628": {"fecha": "2026-07-02", "destino": "Suba villa cindy, Cundinamarca", "guia": "DTL-2026-2628"}, "2629": {"fecha": "2026-07-04", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2629"}, "2630": {"fecha": "2026-07-06", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2630"}, "2631": {"fecha": "2026-07-07", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2631"}, "2632": {"fecha": "2026-07-08", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2632"}, "2633": {"fecha": "2026-07-08", "destino": "Funza, Cundinamarca", "guia": "DTL-2026-2633"}, "2634": {"fecha": "2026-07-10", "destino": "15, Bogotá, D.C.", "guia": "DTL-2026-2634"}, "2635": {"fecha": "2026-07-14", "destino": "Bogotá, Bogotá, D.C.", "guia": "DTL-2026-2635"}, "2636": {"fecha": "2026-07-14", "destino": "FUNZA, Cundinamarca", "guia": "DTL-2026-2636"}, "2637": {"fecha": "2026-07-14", "destino": "Villavicencio, Meta", "guia": "DTL-2026-2637"}, "2638": {"fecha": "2026-07-15", "destino": "Bogotá, Bogotá, D.C.", "guia": "DTL-2026-2638"}, "2639": {"fecha": "2026-07-15", "destino": "Bogotá, Bogotá, D.C.", "guia": "DTL-2026-2639"}, "2640": {"fecha": "2026-07-18", "destino": "Valledupar, Cesar", "guia": "DTL-2026-2640"}, "2641": {"fecha": "2026-07-21", "destino": "Bogotá, Bogotá, D.C.", "guia": "DTL-2026-2641"}, "2642": {"fecha": "2026-07-21", "destino": "Funza, Cundinamarca", "guia": "DTL-2026-2642"}, "2643": {"fecha": "2026-07-21", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2643"}, "2644": {"fecha": "2026-07-22", "destino": "bogota, Bogotá, D.C.", "guia": "DTL-2026-2644"}, "2645": {"fecha": "2026-07-22", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2645"}, "2646": {"fecha": "2026-07-23", "destino": "bogota, Bogotá, D.C.", "guia": "DTL-2026-2646"}, "2647": {"fecha": "2026-07-25", "destino": "Bogotá, D.c., Bogotá, D.C.", "guia": "DTL-2026-2647"}, "2648": {"fecha": "2026-07-27", "destino": "bogota, Bogotá, D.C.", "guia": "DTL-2026-2648"}, "2649": {"fecha": "2026-07-27", "destino": "BOGOTA D.C., Cundinamarca", "guia": "DTL-2026-2649"}, "2650": {"fecha": "2026-07-28", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2650"}, "2651": {"fecha": "2026-07-28", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2651"}, "2652": {"fecha": "2026-07-31", "destino": "bogota, Bogotá, D.C.", "guia": "DTL-2026-2652"}, "2653": {"fecha": "2026-07-31", "destino": "bogota, Bogotá, D.C.", "guia": "DTL-2026-2653"}, "2654": {"fecha": "2026-08-03", "destino": "BOGOTA D.C., Cundinamarca", "guia": "DTL-2026-2654"}, "2655": {"fecha": "2026-08-03", "destino": "Manizales, Caldas", "guia": "DTL-2026-2655"}, "2656": {"fecha": "2026-08-04", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2656"}, "2657": {"fecha": "2026-08-08", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2657"}, "2658": {"fecha": "2026-08-11", "destino": "BOGOTA D.C., Bogotá, D.C.", "guia": "DTL-2026-2658"}, "2659": {"fecha": "2026-08-13", "destino": "FUNZA, Cundinamarca", "guia": "DTL-2026-2659"}, "2660": {"fecha": "2026-08-14", "destino": "Medellin, Antioquia", "guia": "DTL-2026-2660"}, "2661": {"fecha": "2026-08-14", "destino": "Bogotá, Bogotá, D.C.", "guia": "DTL-2026-2661"}, "2662": {"fecha": "2026-08-14", "destino": "Bogotá, Bogotá, D.C.", "guia": "DTL-2026-2662"}, "2663": {"fecha": "2026-08-18", "destino": "Bogota, Cundinamarca", "guia": "DTL-2026-2663"}, "2664": {"fecha": "2026-08-18", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2664"}, "2665": {"fecha": "2026-08-20", "destino": "Funza, Cundinamarca", "guia": "DTL-2026-2665"}, "2666": {"fecha": "2026-08-20", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2666"}, "2667": {"fecha": "2026-08-21", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2667"}, "2668": {"fecha": "2026-08-21", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2668"}, "2669": {"fecha": "2026-08-22", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2669"}, "2670": {"fecha": "2026-08-27", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2670"}, "2671": {"fecha": "2026-08-30", "destino": "Bogotá, Bogotá, D.C.", "guia": "DTL-2026-2671"}, "2672": {"fecha": "2026-09-01", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2672"}, "2673": {"fecha": "2026-09-07", "destino": "ARMENIA, Quindío", "guia": "DTL-2026-2673"}, "2674": {"fecha": "2026-09-07", "destino": "BOGOTA D.C., Cundinamarca", "guia": "DTL-2026-2674"}, "2675": {"fecha": "2026-09-07", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2675"}, "2676": {"fecha": "2026-09-07", "destino": "Bogotá, Bogotá, D.C.", "guia": "DTL-2026-2676"}, "2677": {"fecha": "2026-09-07", "destino": "Valledupar, Cesar", "guia": "DTL-2026-2677"}, "2678": {"fecha": "2026-09-10", "destino": "Funza, Cundinamarca", "guia": "DTL-2026-2678"}, "2679": {"fecha": "2026-09-10", "destino": "Bogotá, Bogotá, D.C.", "guia": "DTL-2026-2679"}, "2680": {"fecha": "2026-09-14", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2680"}, "2681": {"fecha": "2026-09-15", "destino": "bogota, Bogotá, D.C.", "guia": "DTL-2026-2681"}, "2682": {"fecha": "2026-09-15", "destino": "FUNZA, Cundinamarca", "guia": "DTL-2026-2682"}, "2683": {"fecha": "2026-09-15", "destino": "Bogotá, Bogotá, D.C.", "guia": "DTL-2026-2683"}, "2684": {"fecha": "2026-09-16", "destino": "Bogotá, D.C., Bogotá, D.C.", "guia": "DTL-2026-2684"}, "2685": {"fecha": "2026-09-20", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2685"}, "2686": {"fecha": "2026-09-20", "destino": "Soacha, Cundinamarca", "guia": "DTL-2026-2686"}, "2687": {"fecha": "2026-09-22", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2687"}, "2688": {"fecha": "2026-09-22", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2688"}, "2689": {"fecha": "2026-09-22", "destino": "Cajica, Cundinamarca", "guia": "DTL-2026-2689"}, "2690": {"fecha": "2026-09-22", "destino": "Bucaramanga, Santander", "guia": "DTL-2026-2690"}, "2691": {"fecha": "2026-09-23", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2691"}, "2692": {"fecha": "2026-09-30", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2692"}, "2693": {"fecha": "2026-10-01", "destino": "Bogota, Bogotá, D.C.", "guia": "DTL-2026-2693"}, "2694": {"fecha": "2026-10-05", "destino": "BOGOTA D.C., Cundinamarca", "guia": "DTL-2026-2694"}, "2695": {"fecha": "2026-10-05", "destino": "BOGOTA, Bogotá, D.C.", "guia": "DTL-2026-2695"}, "2696": {"fecha": "2026-10-07", "destino": "Bogotá, D.C.", "guia": "DTL-2026-2696"}, "2697": {"fecha": "2026-10-09", "destino": "Bogotá, D.C.", "guia": "DTL-2026-2697"}, "2698": {"fecha": "2026-10-12", "destino": "Bogotá, D.C.", "guia": "DTL-2026-2698"}, "2699": {"fecha": "2026-10-14", "destino": "Bogotá, D.C.", "guia": "DTL-2026-2699"}, "2700": {"fecha": "2026-10-16", "destino": "Bogotá, D.C.", "guia": "DTL-2026-2700"}, "2701": {"fecha": "2026-10-19", "destino": "Bogotá, D.C.", "guia": "DTL-2026-2701"}, "2702": {"fecha": "2026-10-20", "destino": "Bogotá, D.C.", "guia": "DTL-2026-2702"}, "2703": {"fecha": "2026-10-20", "destino": "Bogotá, D.C.", "guia": "DTL-2026-2703"}};

let isSyncInProgress = false;
let lastStateSignature = '';
let mutationDebounceTimer = null;

function formatYMD(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function parseShopifyRowDate(text) {
  const now = new Date();
  const lower = text.toLowerCase();

  const monthsEs = {
    ene: 0, enero: 0, feb: 1, febrero: 1, mar: 2, marzo: 2, abr: 3, abril: 3,
    may: 4, mayo: 4, jun: 5, junio: 5, jul: 6, julio: 6, ago: 7, agosto: 7,
    sep: 8, sept: 8, septiembre: 8, set: 8, oct: 9, octubre: 9, nov: 10, noviembre: 10, dic: 11, diciembre: 11
  };
  const matchEs = lower.match(/\b(\d{1,2})\s+(?:de\s+)?(ene(?:ro)?|feb(?:rero)?|mar(?:zo)?|abr(?:il)?|may(?:o)?|jun(?:io)?|jul(?:io)?|ago(?:sto)?|sep(?:t(?:iembre)?)?|set|oct(?:ubre)?|nov(?:iembre)?|dic(?:iembre)?)\.?\b(?:\s+(?:de\s+)?(\d{4}))?/);
  if (matchEs) {
    const day = parseInt(matchEs[1], 10);
    const mName = matchEs[2].replace('.', '');
    const year = matchEs[3] ? parseInt(matchEs[3], 10) : now.getFullYear();
    if (monthsEs[mName] !== undefined) return formatYMD(new Date(year, monthsEs[mName], day));
  }

  const monthsEn = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
  const matchEn = lower.match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+(\d{1,2})(?:,?\s+(\d{4}))?\b/);
  if (matchEn) {
    const mIdx = monthsEn[matchEn[1]];
    const day = parseInt(matchEn[2], 10);
    const year = matchEn[3] ? parseInt(matchEn[3], 10) : now.getFullYear();
    if (mIdx !== undefined) return formatYMD(new Date(year, mIdx, day));
  }

  if (/\b(hoy|today|hace\s+\d+)\b/.test(lower)) return formatYMD(now);
  if (/\b(ayer|yesterday)\b/.test(lower)) {
    const d = new Date(now);
    d.setDate(d.getDate() - 1);
    return formatYMD(d);
  }

  const weekdays = [
    { rx: /\b(domingo|sunday)\b/, day: 0 },
    { rx: /\b(lunes|monday)\b/, day: 1 },
    { rx: /\b(martes|tuesday)\b/, day: 2 },
    { rx: /\b(miércoles|miercoles|wednesday)\b/, day: 3 },
    { rx: /\b(jueves|thursday)\b/, day: 4 },
    { rx: /\b(viernes|friday)\b/, day: 5 },
    { rx: /\b(sábado|sabado|saturday)\b/, day: 6 }
  ];
  for (const w of weekdays) {
    if (w.rx.test(lower)) {
      const d = new Date(now);
      let diff = (d.getDay() - w.day + 7) % 7;
      if (diff === 0) diff = 7;
      d.setDate(d.getDate() - diff);
      return formatYMD(d);
    }
  }

  const matchIso = lower.match(/\b(20\d{2}-\d{2}-\d{2})\b/);
  if (matchIso) return matchIso[1];

  return formatYMD(now);
}

function parseOrdersFromDOM(savedMeta = {}) {
  const byNumber = new Map();
  const todayStr = formatYMD(new Date());

  const rows = document.querySelectorAll('tr, [role="row"]');
  rows.forEach(row => {
    const text = (row.innerText || '').replace(/\s+/g, ' ').trim();
    const matchOrder = text.match(/#(\d{4,6})\b/);
    if (!matchOrder) return;

    const orderInt = parseInt(matchOrder[1], 10);
    const orderDigits = String(orderInt);
    const orderNumber = '#' + orderDigits;
    if (byNumber.has(orderInt)) return;

    const textLower = text.toLowerCase();
    const isDelivered = textLower.includes('entregado') || textLower.includes('delivered');
    const isUnfulfilled = textLower.includes('no preparado') || textLower.includes('unfulfilled') || textLower.includes('en preparación') || textLower.includes('in progress') || textLower.includes('en espera') || textLower.includes('on hold');
    const isFulfilled = !isUnfulfilled && (textLower.includes('preparado') || textLower.includes('fulfilled'));

    let step = 1;
    let statusTitle = 'Pedido en preparación';
    if (isDelivered) {
      step = 3;
      statusTitle = 'Pedido entregado';
    } else if (isFulfilled) {
      step = 2;
      statusTitle = 'Pedido en tránsito';
    }

    const histMeta = HISTORICAL_META[orderDigits];
    const prevSaved = savedMeta[orderDigits] || {};
    const parsedDate = parseShopifyRowDate(text);

    const createdDate = (histMeta && histMeta.fecha) || prevSaved.createdDate || parsedDate;
    const guia = (histMeta && histMeta.guia) || prevSaved.guia || ('DTL-2026-' + orderDigits);
    const destino = (histMeta && histMeta.destino) || prevSaved.destino || 'Bogotá, D.C.';

    let transitDate = prevSaved.transitDate || createdDate;
    let deliveredDate = prevSaved.deliveredDate || 'Completado';

    if (prevSaved.lastStep && prevSaved.lastStep !== step) {
      if (step === 2) transitDate = todayStr;
      if (step === 3) deliveredDate = todayStr;
    }

    savedMeta[orderDigits] = {
      createdDate: createdDate,
      transitDate: transitDate,
      deliveredDate: deliveredDate,
      lastStep: step,
      guia: guia,
      destino: destino
    };

    const history = [];
    if (step === 3) {
      history.push({ time: deliveredDate, desc: 'Pedido entregado a satisfacción en ' + destino + '.' });
    }
    if (step >= 2) {
      history.push({ time: transitDate, desc: 'Despachado con Flota Propia Detalgraf. Guía: ' + guia + '.' });
    }
    history.push({ time: createdDate, desc: 'Pedido ' + orderNumber + ' registrado y confirmado en Shopify.' });

    byNumber.set(orderInt, {
      orderNumber: orderNumber,
      factura: 'Factura B2B ' + orderNumber,
      transportadora: 'Flota Propia Detalgraf',
      guia: guia,
      destino: destino,
      step: step,
      statusTitle: statusTitle,
      fecha: createdDate,
      dates: [
        createdDate,
        step >= 2 ? (transitDate !== createdDate ? transitDate : 'Despachado') : 'Pendiente',
        step === 3 ? (deliveredDate !== 'Completado' ? deliveredDate : 'Entregado') : 'Estimado 24-48h'
      ],
      history: history
    });
  });

  const sortedKeys = Array.from(byNumber.keys()).sort((a, b) => b - a);
  return sortedKeys.map(k => byNumber.get(k));
}

function updateBadgeStatus(msg, isOk = true) {
  let badge = document.getElementById('detalshop-sync-badge');
  if (!badge) {
    badge = document.createElement('div');
    badge.id = 'detalshop-sync-badge';
    badge.style.cssText = 'position:fixed; bottom:18px; right:18px; z-index:999999; background:#0f172a; color:#ffffff; padding:10px 14px; border-radius:10px; font-family:sans-serif; font-size:12px; font-weight:600; box-shadow:0 8px 20px rgba(0,0,0,0.25); display:flex; align-items:center; gap:10px; border:1px solid #334155;';
    
    const statusSpan = document.createElement('span');
    statusSpan.id = 'detalshop-sync-text';
    badge.appendChild(statusSpan);

    const btn = document.createElement('button');
    btn.textContent = 'Sincronizar ahora';
    btn.style.cssText = 'background:#0284c7; color:#fff; border:none; border-radius:6px; padding:5px 10px; font-size:11px; font-weight:700; cursor:pointer;';
    btn.onclick = () => checkAndSyncOrders(true);
    badge.appendChild(btn);

    document.body.appendChild(badge);
  }
  const textEl = document.getElementById('detalshop-sync-text');
  if (textEl) {
    textEl.textContent = (isOk ? '🟢 Detalgraf Sync: ' : '🟡 Detalgraf Sync: ') + msg;
  }
}

function checkAndSyncOrders(forceUpload = false) {
  if (isSyncInProgress) return;

  chrome.storage.local.get(['savedOrderMeta', 'lastStateSignature'], (storageData) => {
    const savedMeta = (storageData && storageData.savedOrderMeta) || {};
    const prevSig = (storageData && storageData.lastStateSignature) || lastStateSignature;

    const orders = parseOrdersFromDOM(savedMeta);
    if (!orders || orders.length === 0) {
      updateBadgeStatus('Abre la sección Pedidos (Orders) para escuchar cambios', false);
      return;
    }

    const currentSig = orders.map(o => `${o.orderNumber}:${o.step}`).join('|');

    if (!forceUpload && currentSig === prevSig) {
      updateBadgeStatus(`En espera de cambios de status (${orders.length} pedidos monitoreados en vivo)`, true);
      return;
    }

    isSyncInProgress = true;
    lastStateSignature = currentSig;
    chrome.storage.local.set({ savedOrderMeta: savedMeta, lastStateSignature: currentSig });

    updateBadgeStatus('Cambio de status detectado — Actualizando Google Sheets...', false);

    chrome.runtime.sendMessage({ action: 'UPLOAD_ORDERS_TO_SHEET', orders: orders }, (resp) => {
      isSyncInProgress = false;
      const timeStr = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
      if (resp && resp.ok) {
        updateBadgeStatus(`Actualizado por cambio de status (${orders[0].orderNumber} · ${timeStr})`, true);
      } else {
        updateBadgeStatus(`Error al sincronizar — Reintentando`, false);
      }
    });
  });
}

// 1. Detector instantáneo de cambio de status en la tabla (MutationObserver)
const observer = new MutationObserver(() => {
  if (mutationDebounceTimer) clearTimeout(mutationDebounceTimer);
  mutationDebounceTimer = setTimeout(() => {
    checkAndSyncOrders(false);
  }, 1000);
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
  characterData: true
});

// 2. Chequeo inicial al abrir la página
setTimeout(() => {
  checkAndSyncOrders(false);
}, 3000);

// 3. Revisión automática de respaldo cada 3 minutos por si el cambio se hizo desde otro computador
setInterval(() => {
  if (window.location.href.includes('/orders')) {
    window.location.reload();
  }
}, 3 * 60 * 1000);

chrome.runtime.onMessage.addListener((msg) => {
  if (msg && msg.action === 'RUN_SHOPIFY_SYNC') {
    checkAndSyncOrders(true);
  }
});
